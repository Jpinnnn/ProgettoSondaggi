const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

/* *
*   Per le risposte ai sondaggi hanno senso (forse) solo tre API:
*
*   Una PUT per mandare definitivamente le risposte al DB
*   Una PUT per salvare in bozza le risposte date così da riprendere il sondaggio in un secondo momento
*   Una GET per riprendere le risposte rimaste in sospeso
*   
*   E' previsto un pulsante che invia il questionario alle email elencate e successivamente crea la collection di risposta al sondaggio

*   Per quanto riguarda l'analytics invece vanno fatte delle query di conteggio {toDo}
* */

//L'ordine degli arrai deve essere inverso, importante (altrimenti causa errore)


const risposteSchema = new mongoose.Schema({
    risposta: String                                        //può essere una risposta songola come una risposta multipla
})

const domandeSchema = new mongoose.Schema({
    testo: String,                                          //visualizzo la domanda per una facile lettura
    tipologia: String,
    risposte: [risposteSchema]
})

const destinatariSchema = new mongoose.Schema({
    email: String,
    completato: Boolean,                                    //indica se la risposta è definitiva (true) o in bozza (false)
    domande: [domandeSchema]
})

const risposteAiSondaggiSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,                     //Deve essere uguale all'id del sondaggio
    titolo: String,
    emailDestinatari: [destinatariSchema]
},
{
    collection: "RisposteAiSondaggi",
    timestamp: true
})

module.exports.RisposteAiSondaggi = mongoose.model("RisposteAiSondaggi", risposteAiSondaggiSchema);