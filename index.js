const express = require("express")
const cors = require('cors');
const connectToDb = require('./conn.js');
const http = require ("http");
                                                            //const router = require('./routes.js')
const APIsondaggi = require('./APIs/APIsondaggi.js')
//const APIutenti = require('./APIs/APIutenti.js')

// const os = require("os");
// const { writeFile } = require("fs");
// const { readFile } = require("fs");

// const emailList = require("./moduli/email-list");
// const prove = require ("./prove/prove");


const app = express()
app.use(cors());
app.use(express.json());

                                                            // app.use('/API', router);
                                                            // app.use(require('./routes.js'));

app.use('/API', APIsondaggi);
//app.use(require('./APIs/APIsondaggi.js'));
// app.use('/API', APIutenti);
// app.use(require('./APIs/APIutenti.js'));

const port = 3000;

connectToDb();

app.listen(port, () =>{
    console.log(`L'app è in ascolto sulla porta ${port}`)      
})

app.get('/', function (req, res) {
    res.send('Benvenuto sulla home!'+ '<br></br>' +' Le API disponibili sono:'+ '<br></br>' +
    '/API/getSondaggi => prende la lista dei sondaggi dal DB' + '<br></br>' +
    '/API/getSondaggioById => prende il SINGOLO sondaggio tramite id' + '<br></br>' +
    '/API/getDomandeByIdSondaggio => prende la lista delle domande  tramite ID del sondaggio' + '<br></br>' +
    '/API/getRisposteByIdDomanda => prende la lista delle risposte tramite ID della domanda' + '<br></br>' +
    '<br></br>'+
    '/API/postSondaggio => crea un nuovo sondaggio completo' + '<br></br>'+
    '<br></br>'+
     '/API/deleteSondaggioById => elimina un sondaggio tramite id' + '<br></br>'+
     '')
  })

