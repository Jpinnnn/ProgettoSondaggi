const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { Sondaggi } = require('../modelli/Sondaggi');

const routerSondaggi = express.Router();

const mongoose = require('mongoose');
// const Modello = mongoose.model("modelloSondaggi", Sondaggi);
//const modelloquery = new Modello();


//------------------------------GETs--------------------------------------//

//Prende tutti i sondaggi completi dal db --OK
routerSondaggi.get('/getSondaggi', async (req, res) => {
    Sondaggi.init();

    try {
        const arraySondaggi = await Sondaggi.find();
        console.log(arraySondaggi);
        res.send(arraySondaggi);
    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})

//Prende tutte le domande da un singolo sondaggio tramite id --OK
routerSondaggi.get('/getSondaggioById/:id', async (req, res) => {
    Sondaggi.init();

    try {
        const idSondaggio = new ObjectId(req.params.id);
        const sondaggio = await Sondaggi.findOne({ id: idSondaggio });
        console.log(idSondaggio);
        console.log(sondaggio);
        res.send(sondaggio);

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})

//Prende tutte le domande di un singolo sondaggio tramite id --OK
routerSondaggi.get("/getDomandeByIdSondaggio/:id", async (req, res) => {
    Sondaggi.init();

    try {
        const idSondaggio = new ObjectId(req.params.id);
        const sondaggio = await Sondaggi.findOne({ id: idSondaggio });
        const domande = sondaggio.domande;

        console.log(domande);
        res.send(domande);
    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})


// Prende tutte le risposte di una singola domanda tramite id    --OK
routerSondaggi.get("/getRisposteByIdDomanda/:id", async (req, res) => {
    Sondaggi.init();

    try {
        //const idDomanda = new ObjectId(req.params["id"]);
        const idDomanda = new ObjectId(req.params.id);

        const sondaggio = await Sondaggi.findOne({ "domande": { $elemMatch: { id: idDomanda } } })

        let risposte;
        sondaggio.domande.forEach(d => {
            if (d.id == idDomanda) {
                risposte = d.risposte;
            }
        });


        console.log(risposte);
        res.send(risposte);

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})


//------------------------------POSTs--------------------------------------//
/**
 ** Crea un nuovo sondaggio completo    --OK
**/

//CAPIRE COME FARE POST DELLE DATE PRECISE
routerSondaggi.post("/postSondaggio", async (req, res) => {

    Sondaggi.init();
    //console.log(req.body.emailDestinatari.email);
    // let answers = req.body.domande.risposte.map((r) =>(
    //     { risposta: r.risposta }
    // ))

    try {

        let mails = req.body.emailDestinatari.map((m) => ({
            _id: new ObjectId,
            email: m.email
        }));

        let questions = req.body.domande.map((d) => (
            {
                _id: new ObjectId,
                testo: d.testo,
                tipologia: d.tipologia,
                indice: d.indice,
                risposte: d.risposte.map((r) => (
                    {
                        _id: new ObjectId,
                        risposta: r.risposta
                    }
                ))
            }
        ));

        const nuovoSondaggio = new Sondaggi({
            _id: new ObjectId,
            titolo: req.body.titolo,
            sottotitolo: req.body.sottotitolo,
            descrizione: req.body.descrizione,
            dataInizio: req.body.dataInizio,
            dataFine: req.body.dataFine,
            emailCreatore: req.body.emailCreatore,
            emailDestinatari:
                mails,                                  //array di email
            domande:                                    //array di domande
                questions                               //attributi di domande con array di risposte
        })
        await nuovoSondaggio.save();
        return res.send(nuovoSondaggio);

    } catch (error) {
        // console.log(mails, questions)
        res.status(500).json({ messaggio: error.message })

    }

})

module.exports = routerSondaggi;