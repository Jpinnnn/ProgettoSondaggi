const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { Sondaggi } = require('../modelli/Sondaggi');

const routerSondaggi = express.Router();

//------------------------------PATCHes--------------------------------------//

//Elimina una determinata domanda tramite ID    --OK
routerSondaggi.patch("/deleteDomandaById/:id", async (req, res) => {
    Sondaggi.init();

    try {
        const idDomanda = new ObjectId(req.params.id);
        //Trovo il sondaggio con quella domanda specifica
        const sondaggioTrovato = await Sondaggi.findOne({ "domande": { $elemMatch: { _id: idDomanda } } });
        const idSondaggio = new ObjectId(sondaggioTrovato.id);

        //const arrayDomande = sondaggioTrovato.domande;

        const aggiornaDomande = await Sondaggi.updateOne(
            { _id: idSondaggio }, { $pull: { "domande": { _id: idDomanda } } }
        );
        //console.log(aggiornaDomande);
        res.send(aggiornaDomande);

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})

//Modifica il testo, la tipologia e l'indice della domanda
routerSondaggi.patch("/updateDomandaById/:id", async (req, res) => {
    Sondaggi.init();
    try {
        const idDomanda = new ObjectId(req.params.id);
        const sondaggioTrovato = await Sondaggi.findOne({ "domande": { $elemMatch: { _id: idDomanda } } });
        const idSondaggio = new ObjectId(sondaggioTrovato.id);
        const arrayDomande = sondaggioTrovato.domande;
        
        const testoModificato = req.body.testo;
        const tipologiaModificata = req.body.tipologia;
        const indiceModificato = req.body.indice;

        const aggiornaDomanda = await Sondaggi.updateOne(
            { _id: idSondaggio, "domande._id": idDomanda },
            {$set: {"domande.$.testo": testoModificato,"domande.$.tipologia": tipologiaModificata,"domande.$.indice": indiceModificato}}
        )

        console.log(aggiornaDomanda);
        res.send(aggiornaDomanda);

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})

//Aggiunge un elemento delle email alla volta al sondaggio corrente (passare ID sondaggio)
routerSondaggi.patch("/aggiungiDestinatario/:id", async (req, res) => {
    Sondaggi.init();
    try {
        const idSondaggio = new ObjectId(req.params.id);
        const emailAdd = req.body.emailDestinatari;
        const sondaggioTrovato = await Sondaggi.find({ _id: idSondaggio });

        const arrayEmailDest = sondaggioTrovato.emailDestinatari;
        const arrayEmailDestAggiornato = await Sondaggi.updateOne(
            { _id: idSondaggio }, { $push: { "emailDestinatari": { _id: new ObjectId, email: emailAdd } } });

        console.log(arrayEmailDestAggiornato);
        res.send(arrayEmailDestAggiornato);

    } catch (error) {
        res.status(500).json({ messaggio: error.message });
    }
})

/*
//Aggiunge un array di elementi di email al sondaggio corrente (passare ID sondaggio) --NON OK
routerSondaggi.patch("/aggiungiDestinatari/:id", async (req, res) => {
    Sondaggi.init();
    try {
        const idSondaggio = new ObjectId(req.params.id);
        const emailAdd = req.body.emailDestinatari;
        const sondaggioTrovato = await Sondaggi.find({ _id: idSondaggio });

        const arrayEmailDest = sondaggioTrovato.emailDestinatari;

        await arrayEmailDest.forEach(e => {
            let emailCorrente = e.email;

            const arrayEmailDestAggiornato = Sondaggi.updateOne(
                { _id: idSondaggio }, { $push: { "emailDestinatari": { email: { emailCorrente } } } }
            )

            console.log(arrayEmailDestAggiornato);
            res.send(arrayEmailDestAggiornato);
        });



    } catch (error) {
        res.status(500).json({ messaggio: error.message });
    }
})
*/

module.exports = routerSondaggi;