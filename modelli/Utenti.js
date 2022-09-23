const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nome: String,
    cognome: String,
    eta: Number
}
,
    //options
    {
        collection: "Utenti",
        timestamps: true
    }
)

module.exports.User = mongoose.model("Utenti", userSchema);


