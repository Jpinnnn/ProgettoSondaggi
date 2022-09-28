const express = require('express');
const mongodb = require('mongodb');
const { Sondaggi } = require('../modelli/Sondaggi');

const routerSondaggi = express.Router();

//----GETS----//

//Prende tutti i sondaggi dal db
routerSondaggi.get('/getSondaggi', async (req, res) => {
    try {
        const arraySondaggi = Sondaggi.find();
        console.log(arraySondaggi);
        res.send(arraySondaggi);
    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})

//Crea un nuovo sondaggio completo
routerSondaggi.post("/postSondaggio", async (req, res) => {
    try {
        const nuovoSondaggio = new Sondaggi({
            titolo: req.body.titolo,
            sottotitolo: req.body.sottotitolo,
            descrizione: req.body.descrizione,
            dataInizio: req.body.dataInizio,
            dataFine: req.body.dataFine,
            emailCreatore: req.body.emailCreatore,
            emailDestinatari: [{
                email: req.body.emailDestinatari.email
            }],
            domande: [{

                testo: req.body.domande.testo,
                tipologia: req.body.domande.tipologia,
                indice: req.body.domande.indice,

                //non obbligatoria
                risposte: [{

                    risposta: req.body.domande.risposte.risposta

                }]
            }]

        })
    } catch (error) {
        res.status(500).json({ messaggio: error.message })

    }

})

module.exports = routerSondaggi;