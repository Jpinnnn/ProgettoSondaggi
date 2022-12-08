const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { Sondaggi } = require('../../modelli/Sondaggi');

const routerSondaggi = express.Router();

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
        const sondaggio = await Sondaggi.findOne({ _id: idSondaggio });
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
        const sondaggio = await Sondaggi.findOne({ _id: idSondaggio });
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

        const sondaggio = await Sondaggi.findOne(
            { "domande": { $elemMatch: { _id: idDomanda } } }
        )

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

//Prende la lista delle email dei destinatari tramite id del sondaggio --OK
routerSondaggi.get("/getDestinatari/:id", async (req, res) => {
    Sondaggi.init();
    try {
        const idSondaggio = new ObjectId(req.params.id)
        const sondaggioTrovato = await Sondaggi.findOne({_id: idSondaggio});
        const destinatari = sondaggioTrovato.emailDestinatari;

        console.log(destinatari);
        res.send(destinatari);

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})

//Prende la domanda nel dettaglio
routerSondaggi.get("/getDomandaById/:id", async(req, res) =>{
    Sondaggi.init();
    try {
        const idDomanda=new ObjectId(req.params.id);
        const sondaggioTrovato = await Sondaggi.findOne({
            "domande": {$elemMatch:{
                _id: idDomanda
            }}
        })
        const arrayDomande = sondaggioTrovato.domande;
        let domandaTrovata = "";

        arrayDomande.forEach(d => {
            if(idDomanda == d.id){
                domandaTrovata = d;
            }
        });

        console.log(domandaTrovata);
        res.send(domandaTrovata);

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})


module.exports = routerSondaggi;