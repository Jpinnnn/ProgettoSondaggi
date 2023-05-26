const express = require("express")
const cors = require('cors');
const connectToDb = require('./conn.js');
const app = express();

app.use(cors());
app.use(express.json());

const APIgetS = require('./APIs/APIsond/APIget.js');
const APIpostS = require('./APIs/APIsond/APIpost.js');
const APIpatchS = require('./APIs/APIsond/APIpatch.js');
const APIdeleteS = require('./APIs/APIsond/APIdelete.js');

app.use('/API', APIgetS);
app.use('/API', APIpostS);
app.use('/API', APIpatchS);
app.use('/API', APIdeleteS);

const APIstats = require('./APIs/APIstats/stats.js')

app.use('/API', APIstats);

const APIgetEmail = require('./APIs/APIemail/APIget.js')
const APIpostEmail = require('./APIs/APIemail/APIpost.js')

app.use('/API', APIgetEmail);
app.use('/API', APIpostEmail);

// const APIgetR = require('./APIs/APIrisp/APIget');
// const APIpostR = require('./APIs/APIrisp/APIpost');
// const APIpatchR = require('./APIs/APIrisp/APIpatch');
// const APIdeleteR = require('./APIs/APIrisp/APIdelete');

// app.use('/API', APIgetR);
// app.use('/API', APIpostR);
// app.use('/API', APIpatchR);
// app.use('/API', APIdeleteR);

const port = 3000;
connectToDb();

app.listen(port, () => {
    console.log(`L'app è in ascolto sulla porta ${port}`)
})

app.get('/', function (req, res) {
    res.send('<h1>Benvenuto sulla home!</h1>' + ' Le API disponibili sono:' + '<br></br>' +

        '----------------------------------------Sondaggi---------------------------------------' +
        '<br></br>' +
        "[GET] /API/getSondaggi => prende la lista dei sondaggi dal DB" + '<br></br>' +
        "[GET] /API/getSondaggioById/:idSondaggio => prende il SINGOLO sondaggio tramite ID" + '<br></br>' +
        "[POST] /API/postSondaggio => crea un nuovo sondaggio completo" + '<br></br>' +
        "[POST] /API/postSondaggio1 => aggiunge un json con soli _id, titolo, sottotitolo," +
        " descrizione, dataInizio, dataFine, stato, emailCreatore, tutti gli altri campi vuoti" + '<br></br>' +
        "[PATCH] /API/updateSondaggioById/:idSondaggio => update dei parametri del sondaggio" + '<br></br>' +
        "[DELETE] /API/deleteSondaggioById/:idSondaggio => elimina un sondaggio tramite ID" + '<br></br>' +

        '-------------------------------------emailDestinatari-----------------------------------' +
        '<br></br>' +
        "[GET] /API/getDestinatari => prende la lista dei destinatari" + '<br></br>' +
        "[PATCH] /API/aggiungiDestinatario/:idSondaggio => Aggiunge un elemento delle email alla volta " +
        "al sondaggio corrente (passare ID sondaggio, emailDestinatari nel body)" + '<br></br>' +
        "[PATCH] /API/updateDestinatarioById/:idDestinatario => aggiorna la email del destinatario tramite ID" + '<br></br>' +
        "[PATCH] /API/deleteDestinatarioById/:idDestinatario => elimina la email del destinatario tramite ID" + '<br></br>' +

        '------------------------------------------Domande---------------------------------------' +
        '<br></br>' +
        "[GET] /API/getDomandeByIdSondaggio/:idSondaggio => prende la lista delle domande tramite ID del sondaggio" + '<br></br>' +
        "[GET] /API/getDomandaById/:idDomanda => prende la domanda tramite ID " + '<br></br>' +
        "[PATCH] /API/aggiungiDomanda/:idSondaggio {/id sondaggio appena creato} => inserisce una nuova domanda SENZA risposte" + '<br></br>' +
        "[PATCH] /API/aggiungiDomandaCompleta/:idSondaggio {/id sondaggio appena creato} => inserisce una nuova domanda CON ARRAY di risposte" + '<br></br>' +
        "[PATCH] /API/updateDomandaById/:idDomanda => modifica il testo, la tipologia e l'indice della domanda tramite l'ID" + '<br></br>' +
        "[PATCH] /API/deleteDomandaById/:idDomanda => elimina una domanda tramite ID" + '<br></br>' +

        '------------------------------------------Risposte----------------------------------------' +
        '<br></br>' +
        "[GET] /API/getRisposteByIdDomanda/:idDomanda => prende la lista delle risposte tramite ID della domanda" + '<br></br>' +
        "[PATCH] /API/aggiungiRispostaByIdDomanda/:idDomanda => aggiunge una risposta all'elenco di una domanda" + '<br></br>' +
        "[PATCH] /API/updateRispostaById/:idRisposta => modifica una risposta tramite ID" + '<br></br>' +
        "[PATCH] /API/deleteRispostaById/:idRisposta => elimina una risposta tramite ID" + '<br></br>' +
        
        "----------------------------------------RisposteAiSondaggi---------------------------------------" +
        '<br></br>' +
        "[GET] /API/getIncompletiById/:idSondaggio => ottiene il numero di sondaggi completi rispetto al totale passando l'ID del sondaggio" + '<br></br>' +
        
        "----------------------------------------EmailList Login---------------------------------------" +
        '<br></br>' +
        "[GET] /API/Login => Login" + '<br></br>' +
        "[POST] /API/PostEmailList => crea un nuovo utente inserendo email, password e tipo di utente (a:true/u:false)" + '<br></br>' +

        '')

})

