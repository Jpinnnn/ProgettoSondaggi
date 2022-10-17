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
    
    /*'------------------------------------------GETs----------------------------------------'+
    '<br></br>'+
    '/API/getSondaggi => prende la lista dei sondaggi dal DB' + '<br></br>' +
    '/API/getSondaggioById => prende il SINGOLO sondaggio tramite ID' + '<br></br>' +
    '/API/getDomandeByIdSondaggio => prende la lista delle domande  tramite ID del sondaggio' + '<br></br>' +
    '/API/getRisposteByIdDomanda => prende la lista delle risposte tramite ID della domanda' + '<br></br>' +
    '------------------------------------------POSTs----------------------------------------'+
    '<br></br>'+
    '/API/postSondaggio => crea un nuovo sondaggio completo' + '<br></br>'+
    '/API/postSondaggio1 => aggiunge un json con soli _id, titolo, sottotitolo,'+
    ' descrizione, dataInizio, dataFine, stato, emailCreatore, tutti gli altri campi vuoti'+ '<br></br>' +
    '------------------------------------------DELETEs----------------------------------------'+
    '<br></br>'+
    '/API/deleteSondaggioById => elimina un sondaggio tramite ID' + '<br></br>'+
    '------------------------------------------PATCHes----------------------------------------'+
    '<br></br>'+
    '/API/deleteDomandaById => elimina una domanda tramite ID'+'<br></br>'+
    '/API/aggiungiDestinatario => Aggiunge un elemento delle email alla volta '+
    'al sondaggio corrente (passare ID sondaggio, emailDestinatari nel body)'+'<br></br>'+
    "/API/updateDomandaById => Modifica il testo, la tipologia e l'indice della domanda tramite l'ID"+
    '<br></br>'+
    */

    '----------------------------------------Sondaggio---------------------------------------'+
    '<br></br>'+
    "[GET] /API/getSondaggi => prende la lista dei sondaggi dal DB"+'<br></br>'+
    "[GET] /API/getSondaggioById => prende il SINGOLO sondaggio tramite ID"+'<br></br>'+
    "[POST] /API/postSondaggio => crea un nuovo sondaggio completo"+'<br></br>'+
    "[POST] /API/postSondaggio1 => aggiunge un json con soli _id, titolo, sottotitolo,"+
    " descrizione, dataInizio, dataFine, stato, emailCreatore, tutti gli altri campi vuoti"+'<br></br>'+
    "[PATCH] /API/updateSondaggioById => update dei parametri del sondaggio"+'<br></br>'+
    "[DELETE] /API/deleteSondaggioById => elimina un sondaggio tramite ID"+'<br></br>'+

    '-------------------------------------emailDestinatari-----------------------------------'+
    '<br></br>'+
    "[GET] /API/getDestinatari => prende la lista dei destinatari"+'<br></br>'+
    "[PATCH] /API/aggiungiDestinatario => Aggiunge un elemento delle email alla volta "+
    "al sondaggio corrente (passare ID sondaggio, emailDestinatari nel body)"+'<br></br>'+
    "[PATCH] /API/updateDestinatarioById => aggiorna la email del destinatario tramite ID"+'<br></br>'+
    "[PATCH] /API/deleteDestinatarioById => elimina la email del destinatario tramite ID"+'<br></br>'+
    
    '------------------------------------------Domande---------------------------------------'+
    '<br></br>'+
    "[GET] /API/getDomandeByIdSondaggio => prende la lista delle domande  tramite ID del sondaggio"+'<br></br>'+
    "[PATCH] /API/aggiungiDomanda => inserisce una nuova domanda SENZA risposte"+'<br></br>'+
    "[PATCH] /API/aggiungiDomandaCompleta => inserisce una nuova domanda CON ARRAY di risposte"+'<br></br>'+
    "[PATCH] /API/updateDomandaById => modifica il testo, la tipologia e l'indice della domanda tramite l'ID"+'<br></br>'+
    "[PATCH] /API/deleteDomandaById => elimina una domanda tramite ID"+'<br></br>'+

    '------------------------------------------Risposte----------------------------------------'+
    '<br></br>'+
    "[GET] /API/getRisposteByIdDomanda => prende la lista delle risposte tramite ID della domanda"+'<br></br>'+
    "[PATCH] /API/aggiungiRispostaByIdDomanda => aggiunge una risposta all'elenco di una domanda"+'<br></br>'+
    "[PATCH] /API/updateRispostaById => modifica una risposta tramite ID"+'<br></br>'+
    "[PATCH] /API/deleteRispostaById => elimina una risposta tramite ID"+'<br></br>'+
    
    '')


  })

