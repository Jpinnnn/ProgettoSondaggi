const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { Sondaggi } = require('../modelli/Sondaggi');

const routerSondaggi = express.Router();

//------------------------------DELETEs--------------------------------------//

//Elimina l'intero sondaggio tramite ID dello stesso --OK
routerSondaggi.delete("/deleteSondaggioById/:id", async(req, res) =>{
    try {
        const idSondaggio = new ObjectId(req.params.id);
        const sondaggioDaEliminare = await Sondaggi.deleteOne({ _id: idSondaggio }  )
        console.log(sondaggioDaEliminare);
        res.send(sondaggioDaEliminare);
    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})

module.exports = routerSondaggi;