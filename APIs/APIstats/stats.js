const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { Sondaggi } = require('../../modelli/Sondaggi');
const { RisposteAiSondaggi } = require('../../modelli/RisposteAiSondaggi');

const routerStats = express.Router();

//------------------------------POSTs--------------------------------------//

//controlla quanti questionari risultano completi sul totale
//restituisce un json con le statistiche di quante persone hanno completato il sondaggio
routerStats.get('/getCompletiById/:id', async (req, res) => {

    RisposteAiSondaggi.init();

    try {
        const idSondaggio = new ObjectId(req.params.id);
        let numeroDestinatari = 0;
        let numComplete = 0;
        let numIncomplete = 0;
        let arrayEmailMancanti = new Array();

        const numDestinatari = await RisposteAiSondaggi.aggregate([
            { $match: { _id: idSondaggio } },
            { $project: { numDestinatari: { $size: '$emailDestinatari' } } }
        ]);

        numDestinatari.forEach(e => {
            numeroDestinatari = parseInt(e.numDestinatari);
        });

        const risposteMancanti = await RisposteAiSondaggi.aggregate([
            { $match: { _id: idSondaggio } },
            { $unwind: '$emailDestinatari' },
            { $match: { "emailDestinatari.completato": false } },
            { $group: {
                    "_id": "risultato",
                    "risposteMancanti": {"$addToSet": "$emailDestinatari.email"},
                    "totale": { "$sum": 1 }
            }}
        ]
        )

        console.log("STATS: " , risposteMancanti, "\n");

        risposteMancanti.forEach(e => {
            numIncomplete = parseInt(e.totale);
            arrayEmailMancanti = e.risposteMancanti;
        });

        numComplete = numeroDestinatari - numIncomplete;

        const statSondaggi = {
            "destinatariTotali": numeroDestinatari,
            "complete": numComplete,
            "incomplete": numIncomplete,
            "emailMancanti" : arrayEmailMancanti
        }

        console.log(statSondaggi, "\n");
        res.send(statSondaggi);

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }

})


module.exports = routerStats;