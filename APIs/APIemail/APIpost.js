const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { EmailList } = require('../../modelli/EmailList');
const jwt = require('jsonwebtoken')

const routerEmail = express.Router();


//APIs qua

//Login account
routerEmail.post("/Login", async (req, res) => {
    EmailList.init();
    try {
        // const email = req.body.email;
        // const password = req.body.password;
        const {email, password} = req.body;

        //---------------------------------------------------Controllare che non ci siano caratteri particolari
        const emailTrovata = await EmailList.findOne({
            email: email, password: password
        })

        if (!emailTrovata) {
            console.log("Nessun account trovato")
            return res.status(400).json({messaggio: "Nessun account trovato"})
        }

        const jwtToken = jwt.sign(
            { id: emailTrovata.id, email: emailTrovata.email, admin: emailTrovata.admin },
            'passwordsegreta'
        )
        console.log("Dati trovati: ", emailTrovata, "\nToken: ", jwtToken)
        res.cookie("Cookie bello ", jwtToken)
        res.json({"email":emailTrovata.email, "admin": emailTrovata.admin, token: jwtToken})

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})


//inserisce un utente qualsiasi passando email, password e tipo di utente: true = admin, false = dipendente

routerEmail.post('/postEmailList', async (req, res) => {
    try {

        const ti = "@telematicainformatica.it"

        const nuovaEmail = new EmailList({
            _id: new ObjectId,
            email: req.body.email,
            password: req.body.password,
            admin: req.body.admin
        })

        //Se l'email non contiene @telematicainformatica.it
        if (!nuovaEmail.email.includes(ti)) {
            return res.send("email non valida")
        }

        //controlli sulla email e sulla password
        if (!nuovaEmail.email || !nuovaEmail.password ||
            nuovaEmail.email == "''" || nuovaEmail.email == '""' ||
            nuovaEmail.password == "''" || nuovaEmail.password == '""') {
            return res.send("nessuna email o password inserita")
        }

        //Controllo spazi ---------------------------------------------------- DA SISTEMARE
        if(nuovaEmail.email.includes(" ") ){
            console.log("Email con spazi: '", nuovaEmail.email,"'")
            nuovaEmail.email = nuovaEmail.email.trim()
            console.log("Email senza spazi: '",nuovaEmail.email,"'")
        }
        if(nuovaEmail.password.includes(" ")){
            return res.send("La password non deve contenere spazi")
        }


        //filtro che verifica la presenza di una email già presente
        if (await EmailList.findOne({ "email": nuovaEmail.email })) {
            return res.send("Email già presente nel database")
        }

        // // // // verificare che la password abbia almeno 8 caratteri ------- DA FARE

        await nuovaEmail.save();

        console.log(nuovaEmail)
        return res.send(nuovaEmail)

    } catch (error) {
        res.status(500).json({ messaggio: error.message })
    }
})



//inserisce un dipendente
routerEmail.post('/postUserList', async (req, res) => {

})


module.exports = routerEmail;