const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

/* *
*   Per le risposte ai sondaggi hanno senso (forse) solo tre API:
*
*   Una PUT per mandare definitivamente le risposte al DB
*   Una PUT per salvare in bozza le risposte date così da riprendere il sondaggio in un secondo momento
*   Una GET per riprendere le risposte rimaste in sospeso
*   
*   Per quanto riguarda l'analytics invece vanno fatte delle query di conteggio {toDo}
* */

const risposteAiSondaggiSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //Deve essere uguale all'id del sondaggio
    domande: [domandeSchema]
},
{
    collection: "RisposteAiSondaggi ",
        timestamp: true
})

const domandeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tipologia: String,
    risposte: [risposteSchema]
})

const risposteSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    risposta:[dettaglioRispostaSchema] //può essere una risposta songola come una risposta multipla
})

const dettaglioRispostaSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    risposta: String
})


module.exports.RisposteAiSondaggi = mongoose.model("RisposteAiSondaggi", risposteAiSondaggiSchema);