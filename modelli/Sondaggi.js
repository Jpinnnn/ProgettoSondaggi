const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

/**La collezione rappresenta dei sondaggi che hanno come attributi:
 * titolo, sottotitolo, descrizione (visibile solo all'admin), dataInizio, dataFine, stato,
 * emailCreatore, emailDestinatari[], domande[]:
 * Ogni domanda possiede un numero indefinito di risposte e ha come attributi:
 * testo, tipologia, indice, risposta[]:
 * 
 * Prova di modifica
*/

const risposteSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    risposta: String
})

const domandeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    testo: String,
    tipologia: String,
    indice: Number,
    risposte: [risposteSchema]
})

const emailDestinatariSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String
})

const sondaggiSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titolo: String,
    sottotitolo: String,
    descrizione: String,
    dataInizio: Date,
    dataFine: Date,
    stato: String,
    emailCreatore: String,
    emailDestinatari: [emailDestinatariSchema],
    domande: [domandeSchema]
},
    {
        collection: "Sondaggi",
        timestamp: true
    })

module.exports.Sondaggi = mongoose.model("Sondaggi", sondaggiSchema);