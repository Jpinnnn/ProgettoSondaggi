const Ciao = require("./proveLetturaScrittura");

//console.log("process: ", process);
//emailList.stampaEmail();

//console.log("Il PC è aperto da ", (os.uptime()/60/60), " ore")

// const letturaScritturaFile = require ("./prove/proveLetturaScrittura");
// letturaScritturaFile.scrittore("Silenzio :C")
// letturaScritturaFile.lettore();

// const http = require ("http");

// const serverd = http.Server((req, res) => {
//     if(req.url === "/"){
//         res.write("Benvenuto sulla home");
//         // res.end();
//     }
//     if(req.url === `/pippo`){
//         res.write(`Ciao pippo`);
//         // res.end();
//     }
//     res.write(`
//     <h1>Errore! Torna alla <a href="/">HOME</a> </h1>
//     `)
// })

// serverd.listen(3001);

let events = require('events');
let eventEmitter = new events.EventEmitter();
const divisoPerAnni = 1/60/60/24/365/1000;
let oggi = (1970 + Date.now()*divisoPerAnni).toString().slice(0, 4);

eventEmitter.on('messaggio', () => {
  console.log(`Ciao sono stato emesso nel ${oggi}`);
});

eventEmitter.on("notifica", () =>{
    console.log("Ciao, è stata emessa una notifica!")
})

eventEmitter.emit('messaggio');
eventEmitter.emit("notifica");

eventEmitter.emit("notifica", "CONTINUA");

module.exports = {};    //esporta tutto