const express = require("express")
const cors = require('cors');
const connectToDb = require('./conn.js');
//const http = require ("http");
// const APIsondaggi = require('./APIs/APIsondaggi.js');
const APIget = require('./APIs/APIget');
const APIpost = require('./APIs/APIpost');
const APIpatch = require('./APIs/APIpatch');
const APIput = require('./APIs/APIput');
const APIdelete = require('./APIs/APIdelete');

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/API', APIsondaggi);
app.use('/API', APIget);
app.use('/API', APIpost);
app.use('/API', APIpatch);
app.use('/API', APIput);
app.use('/API', APIdelete);
const port = 3000;
connectToDb();

app.listen(port, () =>{
    console.log(`L'app è in ascolto sulla porta ${port}`)      
})

app.get('/', function (req, res) {
    res.send('Benvenuto sulla home!'+ '<br></br>' +' Le API disponibili sono:'+ '<br></br>' +
    '------------------------------------------GETs----------------------------------------'+
    '<br></br>'+
    '/API/getSondaggi => prende la lista dei sondaggi dal DB (get)' + '<br></br>' +
    '/API/getSondaggioById => prende il SINGOLO sondaggio tramite id (get)' + '<br></br>' +
    '/API/getDomandeByIdSondaggio => prende la lista delle domande  tramite ID del sondaggio (get)' + '<br></br>' +
    '/API/getRisposteByIdDomanda => prende la lista delle risposte tramite ID della domanda (get)' + '<br></br>' +
    '------------------------------------------POSTs----------------------------------------'+
    '<br></br>'+
    '/API/postSondaggio => crea un nuovo sondaggio completo (post)' + '<br></br>'+
    '------------------------------------------DELETEs----------------------------------------'+
    '<br></br>'+
    '/API/deleteSondaggioById => elimina un sondaggio tramite ID (delete)' + '<br></br>'+
    '------------------------------------------PATCHes----------------------------------------'+
    '<br></br>'+
    '/API/deleteDomandaById => elimina una domanda tramite ID (patch)'+'<br></br>'+
    '')
  })

