const path = require("path");
const { readFile, writeFile } = require("fs");
//const fsw = require("fs") //fsw.writeFile ecc
let coseDaScrivere = "Cose da scrivere sul testo!";
let coseDaLeggere = "";
const pathRel = path.join("prove", "testoProva.txt");

console.log(pathRel);

// writeFile(pathRel, coseDaScrivere, (error, result)=>{
//     if(error){
//         console.log(error);
//         return;
//     }

//     const fatto = result;
//     console.log(coseDaScrivere, "Scritte.");
// })

const scrittore = (CoseScritte) => {
    coseDaScrivere = CoseScritte;
    writeFile(pathRel, coseDaScrivere+" \n", { flag: "a" }, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }

        const fatto = result;
        console.log("Log delle cose scritte: ", coseDaScrivere);
    })
}

const lettore = () => {
    readFile(pathRel, "utf-8", (error, result) => {
        if(error){
            console.log(error);
            return;
        }
        const fatto = result;
        console.log(result);
    });
}

module.exports = { scrittore, lettore };