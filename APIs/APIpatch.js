const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { Sondaggi } = require('../modelli/Sondaggi');

const routerSondaggi = express.Router();

//------------------------------PATCHes--------------------------------------//

//Elimina una determinata domanda tramite ID    --OK
routerSondaggi.patch("/deleteDomandaById/:id", async(req, res) =>{
    Sondaggi.init();
   
    try {
        const idDomanda = new ObjectId(req.params.id);
        //Trovo il sondaggio con quella domanda specifica
        const sondaggioTrovato = await Sondaggi.findOne({"domande": {$elemMatch: {_id: idDomanda}}});
        const idSondaggio = new ObjectId(sondaggioTrovato.id);

        const arrayDomande = sondaggioTrovato.domande;
                
        const aggiornaDomande = await Sondaggi.updateOne({_id: idSondaggio}, {$pull:{"domande":{_id: idDomanda}}});
        //console.log(aggiornaDomande);
        res.send(aggiornaDomande);

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})


module.exports = routerSondaggi;