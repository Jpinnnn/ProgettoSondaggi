const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { Sondaggi } = require('../modelli/Sondaggi');

const routerSondaggi = express.Router();

//------------------------------PATCHes--------------------------------------//

//Aggiorna i parametri del sondaggio tramite ID
routerSondaggi.patch("/updateSondaggioById/:id", async (req, res) => {
    Sondaggi.init();
    try {
        const idSondaggio = new ObjectId(req.params.id);
        const newTitolo = req.body.titolo;
        const newSottotitolo = req.body.sottotitolo;
        const newDescrizione = req.body.descrizione;
        const newDataInizio = new Date(req.body.dataInizio);
        const newDataFine = new Date(req.body.dataFine);
        const newEmailCreatore = req.body.emailCreatore;

        const nuovoSondaggio = await Sondaggi.updateOne(
            { _id: idSondaggio },
            {
                $set: {
                    "titolo": newTitolo,
                    "sottotitolo": newSottotitolo,
                    "descrizione": newDescrizione,
                    "dataInizio": newDataInizio,
                    "dataFine": newDataFine,
                    "emailCreatore": newEmailCreatore
                }
            }
        )
        console.log(nuovoSondaggio);
        res.send(nuovoSondaggio);
    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})

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
        //const arrayDomande = sondaggioTrovato.domande;

        const testoModificato = req.body.testo;
        const tipologiaModificata = req.body.tipologia;
        const indiceModificato = req.body.indice;

        const aggiornaDomanda = await Sondaggi.updateOne(
            { _id: idSondaggio, "domande._id": idDomanda },
            {
                $set:
                {
                    "domande.$.testo": testoModificato,
                    "domande.$.tipologia": tipologiaModificata,
                    "domande.$.indice": indiceModificato
                }
            }
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
            { _id: idSondaggio },
            { $push: { "emailDestinatari": { _id: new ObjectId, email: emailAdd } } });

        console.log(arrayEmailDestAggiornato);
        res.send(arrayEmailDestAggiornato);

    } catch (error) {
        res.status(500).json({ messaggio: error.message });
    }
})

//Aggiorna una email tramite ID
routerSondaggi.patch("/updateDestinatarioById/:id", async (req, res) => {
    Sondaggi.init();
    try {
        const idDestinatario = new ObjectId(req.params.id);
        const newEmail = req.body.email;
        const sondaggioTrovato = await Sondaggi.findOne({ "emailDestinatari": { $elemMatch: { _id: idDestinatario } } });
        const idSondaggio = new ObjectId(sondaggioTrovato.id);
        //const destinatari = sondaggioTrovato.emailDestinatari;

        const nuovoDestinatario = await Sondaggi.updateOne(
            { _id: idSondaggio, "emailDestinatari._id": idDestinatario },
            { $set: { "emailDestinatari.$.email": newEmail } }
        )

        console.log(nuovoDestinatario);
        res.send(nuovoDestinatario);
    } catch (error) {
        res.status(500).json({ messaggio: error.message });
    }
})

//Aggiunge una domanda all'elenco tramite ID del sondaggio
routerSondaggi.patch("/aggiungiDomanda/:id", async (req, res) => {
    Sondaggi.init();
    try {
        const idSondaggio = new ObjectId(req.params.id);
        const idDomanda = new ObjectId();
        const newTesto = req.body.testo;
        const newTipologia = req.body.tipologia;
        const newIndice = req.body.indice;

        const newRisposte = new Array();
        console.log(newRisposte);

        const nuovaDomanda = await Sondaggi.updateOne(
            { _id: idSondaggio },
            {
                $push: {
                    "domande": {
                        _id: new ObjectId(),
                        testo: newTesto,
                        tipologia: newTipologia,
                        indice: newIndice,
                        risposte: newRisposte
                    }
                }
            }
        )
        console.log(nuovaDomanda);
        res.send(nuovaDomanda);

    } catch (error) {
        res.status(500).json({ messaggio: error.message });
    }
})

//Aggiunge una domanda (con le risposte) all'elenco tramite ID del sondaggio --OK
routerSondaggi.patch("/aggiungiDomandaCompleta/:id", async (req, res) => {
    Sondaggi.init();
    try {
        const idSondaggio = new ObjectId(req.params.id);
        const idDomanda = new ObjectId();
        const newTesto = req.body.testo;
        const newTipologia = req.body.tipologia;
        const newIndice = req.body.indice;

        let newRisposte = req.body.risposte;
        const idRisposta = new ObjectId();
        let newRisposte2 = new Array();

        newRisposte.forEach(e => {
            let rispAttuale = e.risposta;
            let risp = { _id: idRisposta, "risposta": rispAttuale };
            newRisposte2.push(risp);
        });

        newRisposte = newRisposte2;

        const nuovaDomanda = await Sondaggi.updateOne(
            { _id: idSondaggio },
            {
                $push: {
                    "domande": {
                        _id: new ObjectId(),
                        testo: newTesto,
                        tipologia: newTipologia,
                        indice: newIndice,
                        risposte: newRisposte
                    }
                }
            }
        )
        console.log(nuovaDomanda);
        res.send(nuovaDomanda);

    } catch (error) {
        res.status(500).json({ messaggio: error.message });
    }
})

//Cancella una email destinatario tramite ID
routerSondaggi.patch("/deleteDestinatarioById/:id", async (req, res) => {
    Sondaggi.init();

    try {
        const idDestinatario = new ObjectId(req.params.id);
        //Trovo il sondaggio con quella domanda specifica
        const sondaggioTrovato = await Sondaggi.findOne(
            { "emailDestinatari": { $elemMatch: { _id: idDestinatario } } }
        );
        const idSondaggio = new ObjectId(sondaggioTrovato.id);

        const aggiornaDestinatari = await Sondaggi.updateOne(
            { _id: idSondaggio }, { $pull: { "emailDestinatari": { _id: idDestinatario } } }
        );
        //console.log(aggiornaDomande);
        res.send(aggiornaDestinatari);

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})

//Aggiunge una risposta tramite ID della domanda
routerSondaggi.patch("/aggiungiRispostaByIdDomanda/:id", async (req, res) => {
    Sondaggi.init();
    try {
        const idDomanda = new ObjectId(req.params.id);
        const newRisposta = req.body.risposta;

        const sondaggioTrovato = await Sondaggi.findOne(
            { "domande": { $elemMatch: { _id: idDomanda } } }
        );
        const idSondaggio = new ObjectId(sondaggioTrovato.id);

        const nuovaRisposta = await Sondaggi.updateOne(
            { _id: idSondaggio, "domande._id": idDomanda },
            {
                $push: {
                    "domande.$.risposte": {
                        _id: new ObjectId(),
                        risposta: newRisposta
                    }
                }
            }
        )
        console.log(nuovaRisposta);
        res.send(nuovaRisposta);

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})

//Modifica una risposta tramite ID  --NON OK
routerSondaggi.patch("/updateRispostaById/:id", async (req, res) => {
    Sondaggi.init();
    try {
        const idRisposta = new ObjectId(req.params.id);
        const newRisposta = req.body.risposta;

        console.log("ID RISPOSTA: ", idRisposta)

        // const sondaggioTrovato = await Sondaggi.findOne(
        //     { "domande.$[].risposte.$[]._id.$[idR]":idRisposta }  
        // );

        // const idSondaggio = new ObjectId(sondaggioTrovato.id);
        // console.log("ID SONDAGGIO TROVATO fda7: ", sondaggioTrovato.id)


        const nuovaRisposta = await Sondaggi.updateOne(
            { "domande.$[].risposte.$[].risposta": newRisposta },
            {arrayFilters: [{"risposte._id": idRisposta}]}
            // console.log("NUOVARISPOSTA: ", idRisposta),
            // {
            //     $set: {
            //         "risposte.$.risposta": newRisposta
            //     }
            // }
        )
        console.log(nuovaRisposta);
        res.send(nuovaRisposta);

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
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