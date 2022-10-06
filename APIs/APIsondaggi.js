const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { Sondaggi } = require('../modelli/Sondaggi');

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

        const sondaggio = await Sondaggi.findOne({ "domande": { $elemMatch: { _id: idDomanda } } })

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

routerSondaggi.post("/postSondaggio", async (req, res) => {
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

//Elimina una determinata domanda tramite ID    --NON OK, elimina l'intero sondaggio
//Va fatto un update
// routerSondaggi.delete("/deleteDomandaById/:id", async(req, res) =>{
//     try {
//         const idDomanda = new ObjectId(req.params.id);
//         //Trovo il sondaggio con quella domanda specifica
//         const sondaggioTrovato = await Sondaggi.find({"domande": {$elemMatch: {_id: idDomanda}}});

//         //console.log("TROVATO SONDAGGIO:", sondaggioTrovato);

//         const arrayDomande = sondaggioTrovato.domande;

//         console.log(sondaggioTrovato.domande);

//         let domandaDaEliminare = '';

//         arrayDomande.forEach(e => {
//             console.log("Trovata domanda " + e);

//             if(e.id == idDomanda){
//                 domandaDaEliminare = e.domanda;
//                 console.log(domandaDaEliminare);
//                 res.send(domandaDaEliminare)
//                 //domandaDaEliminare = e.deleteOne({_id: idDomanda});
//             }
//         });

//         //res.send(domandaDaEliminare);

//         //const domandaDaEliminare = await Sondaggi.deleteOne({ "domande": { $elemMatch: { _id: idDomanda } } })
//         //console.log(domandaDaEliminare);
//         //res.send(domandaDaEliminare);
//     } catch (error) {
//         res.status(500).json({ messaggio: error.message })
//     }
// })


module.exports = routerSondaggi;