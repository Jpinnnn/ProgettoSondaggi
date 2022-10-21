const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");


const emailSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String
},
{
    collection: "EmailList",
    timestamp: true
})

module.exports.EmailList = mongoose.model("EmailList", emailSchema);