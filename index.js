require("dotenv").config();

const {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
} = require("./helpers/inquirer");
const Search = require("./models/search");

const main = async () => {
  let opt;

  const searchs = new Search();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const term = await readInput("City: ");
        const places = await searchs.city(term);
        const id = await listPlaces(places);

        if (id === "0") {
          continue;
        }

        const placeSelected = places.find((x) => x.id == id);
        searchs.addHistorial(placeSelected.name);
        const weather = await searchs.weather(
          placeSelected.lat,
          placeSelected.lng
        );

        console.clear();
        console.log("\nCity information\n".green);
        console.log("City: " + placeSelected.name);
        console.log("Lat: " + placeSelected.lat);
        console.log("Long: " + placeSelected.lng);
        console.log("Weather: " + weather.temp + ", " + weather.desc);
        console.log("Min: " + weather.min);
        console.log("Max: " + weather.max);
        break;
      case 2:
        searchs.capitalCaseHistorial.forEach((place, i) => {
          const idx = `${i + 1}`.green;
          console.log(`${idx} ${place}`);
        });
        break;
    }

    if (opt !== 0) await pause();
  } while (opt != 0);
};

main();
