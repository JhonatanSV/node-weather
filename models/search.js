const axios = require("axios");

class Search {
    historial = [""];

    constructor() {

    }

    async city(place = "") {
        try {
            const resp = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?limit=5&language=es&access_token=pk.eyJ1IjoiamhvbnRnb3ciLCJhIjoiY2xhaGkxNDVjMTN3eTNwbzVkdDJseThzeCJ9.k6tw6UzLaWjuuDGLgm9ypA`);
            console.log(resp)

        } catch (error) {
            return [];
        }
    }


}

module.exports = Search;