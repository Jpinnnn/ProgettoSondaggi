const mongoose = require("mongoose");

/**La collezione rappresenta dei sondaggi che hanno come attributi:
 * titolo, sottotitolo, descrizione (visibile solo all'admin), dataInizio, dataFine, stato,
 * emailCreatore, emailDestinatari[], domande[]:
 * Ogni domanda possiede un numero indefinito di risposte e ha come attributi:
 * testo, tipologia, indice, risposta[]:
 * 
*/
const sondaggiSchema = new mongoose.Schema({
    titolo: String,
    sottotitolo: String,
    descrizione: String,
    dataInizio: Date,
    dataFine: Date,
    emailCreatore: String,
    emailDestinatari:[{
        "email": String
    }],
    domande: [{
        "testo": String,
        "tipologia": String,
        "indice": Number
    }]
},
{
    collection: "Sondaggi",
    timestamp: true
})

module.exports.Sondaggi = mongoose.model("Sondaggi", sondaggiSchema);