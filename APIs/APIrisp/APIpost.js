const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { RisposteAiSondaggi } = require('../../modelli/RisposteAiSondaggi');

const routerRAS = express.Router();

//------------------------------PATCHes--------------------------------------//

//inserisce una risposta
routerRAS.put("/patchRAS", async (req, res) => {
    RisposteAiSondaggi.init();

    try {

        const { _id, titolo, emailDestinatari } = req.body;




    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }

})

//inserisce un modello di risposta vuota quando si invia il questionario
routerRAS.post("/postRAS", async (req, res) => {
    RisposteAiSondaggi.init();

    try {
        let id = ObjectId(req.body._id);
        const titolo = req.body.titolo;
        const nuovaRAS = new RisposteAiSondaggi(
            {
                "_id": id,
                "titolo": titolo,
                "emailDestinatari": []
            }
        )
        console.log(nuovaRAS)
        await nuovaRAS.save()
        return res.send(nuovaRAS)

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }

})


module.exports = routerRAS;