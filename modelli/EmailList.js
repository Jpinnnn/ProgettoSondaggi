const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

/*  Questo modello rappresenta gli utenti a cui sono rivolti i sondaggi
*   L'admin si differenzia dallo user normale con un boolean
*   Se admin == true è un amministratore, altrimenti è uno schia... lavoratore
*/


const emailSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    admin: Boolean
},
{
    collection: "EmailList",
    timestamp: true
})

module.exports.EmailList = mongoose.model("EmailList", emailSchema);