const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { RisposteAiSondaggi } = require('../../modelli/RisposteAiSondaggi');

const routerRAS = express.Router(); //RAS=RisposteAiSondaggi

//------------------------------PUTs--------------------------------------//

//inserisce una risposta
routerRAS.put("/putRAS", async(req, res) =>{
    RisposteAiSondaggi.init();

    try {
        
        const {_id, titolo, emailDestinatari} = req.body;




    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }

})

//inserisce un modello di risposta vuota quando si invia il questionario
routerRAS.put("/putRASbyId", async(req, res) =>{
    RisposteAiSondaggi.init();

})

module.exports = routerRAS;