const fs = require("fs");
const axios = require("axios");

class Search {
  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    this.readDB();
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      lang: "es",
      units: "metric",
    };
  }

  get capitalCaseHistorial() {
    return this.historial.map((place) => {
      return `${place[0].toLocaleUpperCase()}${place.slice(1, place.length)}`;
    });
  }

  async city(place = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();
      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async weather(lat = "", lon = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },
      });

      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async addHistorial(place = "") {
    if (this.historial.includes(place.toLocaleLowerCase())) {
      return;
    }

    this.historial.unshift(place.toLocaleLowerCase());
    this.saveDB();
  }

  saveDB() {
    const payload = {
      historial: this.historial,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (fs.existsSync(this.dbPath)) {
      this.historial = JSON.parse(
        fs.readFileSync(this.dbPath, { encoding: "utf-8" })
      ).historial;
    }
  }
}

module.exports = Search;
