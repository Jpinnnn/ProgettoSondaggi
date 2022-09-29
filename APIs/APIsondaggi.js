const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { Sondaggi } = require('../modelli/Sondaggi');

const routerSondaggi = express.Router();

//----GETS----//

//Prende tutti i sondaggi dal db
routerSondaggi.get('/getSondaggi', async (req, res) => {
    try {
        const arraySondaggi = await Sondaggi.find();
        console.log(arraySondaggi);
        res.send(arraySondaggi);
    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})

//Crea un nuovo sondaggio completo
routerSondaggi.post("/postSondaggio", async (req, res) => {
    //console.log(req.body.emailDestinatari.email);
    let mails = req.body.emailDestinatari.map((m) => ({ email: m.email }));

    let questions = req.body.domande.map((d) => (
        { testo: d.testo ,
         tipologia: d.tipologia ,
         indice: d.indice,
         risposte: d.risposte.map((r) =>(
            { risposta: r.risposta }
        ))}
    ));

    // let answers = req.body.domande.risposte.map((r) =>(
    //     { risposta: r.risposta }
    // ))

    try {       
        const nuovoSondaggio = new Sondaggi({
            titolo: req.body.titolo,
            sottotitolo: req.body.sottotitolo,
            descrizione: req.body.descrizione,
            dataInizio: req.body.dataInizio,
            dataFine: req.body.dataFine,
            emailCreatore: req.body.emailCreatore,
            emailDestinatari:
                mails,                    //array di email
            domande:                                    //array di domande
                questions                              //attributi di domande
                //risposte: ""//answers                   //array di risposte
        })
        await nuovoSondaggio.save();
        return res.send(nuovoSondaggio);

    } catch (error) {
        console.log("/n",mails,"/n",questions,"/n")
        res.status(500).json({ messaggio: error.message })

    }

})

module.exports = routerSondaggi;