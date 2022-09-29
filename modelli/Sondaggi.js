const mongoose = require("mongoose");

/**La collezione rappresenta dei sondaggi che hanno come attributi:
 * titolo, sottotitolo, descrizione (visibile solo all'admin), dataInizio, dataFine, stato,
 * emailCreatore, emailDestinatari[], domande[]:
 * Ogni domanda possiede un numero indefinito di risposte e ha come attributi:
 * testo, tipologia, indice, risposta[]:
 * 
*/
const risposteSchema = new mongoose.Schema({
    risposta: String
})

const domandeSchema = new mongoose.Schema({
    testo: String,
    tipologia: String,
    indice: Number,
    risposte: [risposteSchema]
})

const emailDestinatariSchema = new mongoose.Schema({
    email: String
})

const sondaggiSchema = new mongoose.Schema({
    titolo: String,
    sottotitolo: String,
    descrizione: String,
    dataInizio: Date,
    dataFine: Date,
    emailCreatore: String,
    emailDestinatari: [emailDestinatariSchema],
    domande: [domandeSchema]
},
    {
        collection: "Sondaggi",
        timestamp: true
    })



module.exports.Sondaggi = mongoose.model("Sondaggi", sondaggiSchema);