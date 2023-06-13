const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { RisposteAiSondaggi } = require('../../modelli/RisposteAiSondaggi');

const routerRAS = express.Router();

//------------------------------PATCHes--------------------------------------//

//inserisce una risposta
routerRAS.put("/patchRAS", async (req, res) => {
    RisposteAiSondaggi.init();

    try {

        //dall'id e dall'email si vanno a inserire le domande e le risposte associate
        const id = ObjectId(req.body._id)
        // email è l'email di chi risponde
        // testo è il testo della domanda
        // tipologia è il tipo di domanda (checkbox, radio, aperta)
        //risposte è un array (con argomento risposta)
        const {email, completato, domande} = req.body;
        const {testo, tipologia, risposte} = req.body;
        

        const nuovaRAS = await RisposteAiSondaggi.updateOne(
            { _id: id },
            {
                $set:
                {
                    "emailDestinatari.$.email": email,
                    "emailDestinatari.$.completato": completato,
                    "emailDestinatari.$.domande": [

                    ],
                    
                }
            }

        )

        console.log(nuovaRAS)
        res.send(nuovaRAS)




    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }

})




module.exports = routerRAS;