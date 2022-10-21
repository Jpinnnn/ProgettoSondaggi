const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { Sondaggi } = require('../../modelli/Sondaggi');

const routerSondaggi = express.Router();
//------------------------------POSTs--------------------------------------//


//funzione che riceve in ingresso una richiesta e ritorna un json da postare
const modelloSondaggiPost = (req)=>{
    Sondaggi.init();

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
            dataInizio: new Date(req.body.dataInizio),
            dataFine: new Date(req.body.dataFine),
            stato: req.body.stato,
            emailCreatore: req.body.emailCreatore,
            emailDestinatari:
                mails,                                  //array di email
            domande:                                    //array di domande
                questions                               //attributi di domande con array di risposte
        })
        return nuovoSondaggio;
    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
}

 // Crea un nuovo sondaggio completo    --OK
 routerSondaggi.post("/postSondaggio", async (req, res) => {
 
    try {
        const nuovoSondaggio = modelloSondaggiPost(req);

        await nuovoSondaggio.save();
        return res.send(nuovoSondaggio);

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})

//I livello del sondaggio:
//_id, titolo, sottotitolo, descrizione, dataInizio, dataFine, stato, emailCreatore

routerSondaggi.post("/postSondaggio1", async(req, res)=>{
    // Sondaggi.init();
    try {
        const nuovoSondaggio = new Sondaggi({
            _id: new ObjectId,
            "titolo": req.body.titolo,
            "sottotitolo": req.body.sottotitolo,
            "descrizione": req.body.descrizione,
            "dataInizio": new Date(req.body.dataInizio),
            "dataFine": new Date(req.body.dataFine),
            "stato": req.body.stato,
            "emailCreatore": req.body.emailCreatore
        })

        await nuovoSondaggio.save();
        return res.send(nuovoSondaggio);
    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})

//FAR FUNZIONARE ANCHE SE NON CI SONO TUTTI I PARAMETRI: bypassare il MAP se l'array è vuoto
routerSondaggi.post("/postSondaggio2", async (req, res) => {
    Sondaggi.init();
    
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
            dataInizio: new Date(req.body.dataInizio),
            dataFine: new Date(req.body.dataFine),
            stato: req.body.stato,
            emailCreatore: req.body.emailCreatore,
            emailDestinatari:
                mails,                                  //array di email
            domande:                                    //array di domande
                questions                               //attributi di domande con array di risposte
        })
        await nuovoSondaggio.save();
        return res.send(nuovoSondaggio);

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})

module.exports = routerSondaggi;