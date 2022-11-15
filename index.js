const { inquirerMenu, pause, readInput } = require("./helpers/inquirer");
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

                console.log(places);
                console.log("\nCity information\n".green);
                console.log("City: ",);
                console.log("Lat: ",);
                console.log("Long: ",);
                console.log("Weather: ",);
                console.log("Min: ",);
                console.log("Max: ",);
                break;
            case 2:
                break;
        }

        if (opt !== 0) await pause();

    } while (opt != 0)
}

main();