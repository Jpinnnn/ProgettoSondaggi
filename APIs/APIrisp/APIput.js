const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { RisposteAiSondaggi } = require('../../modelli/RisposteAiSondaggi');

const routerRAS = express.Router(); //RAS=RisposteAiSondaggi

//------------------------------POSTs--------------------------------------//

//inserisce una risposta
routerRAS.put("/putRAS", async(req, res) =>{
    RisposteAiSondaggi.init();

})

//inserisce un modello di risposta vuota quando si invia il questionario
routerRAS.put("/putRASbyId", async(req, res) =>{
    RisposteAiSondaggi.init();

})

module.exports = routerRisposteAiSondaggi;