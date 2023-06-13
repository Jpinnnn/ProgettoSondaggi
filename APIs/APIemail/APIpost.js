const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const validator = require('validator');
const { check, validationResult } = require('express-validator');
const { EmailList } = require('../../modelli/EmailList');
const jwt = require('jsonwebtoken')

const routerEmail = express.Router();

const ti = "@telematicainformatica.it"


//APIs qua

//Login account
routerEmail.post("/Login",
    [
        check("email").isEmail().withMessage('email valida')
            .trim().withMessage('rilevati spazi')
            .escape()
            .normalizeEmail()
            .customSanitizer((email) => email.replace(/\s/g, ""))
            .matches(/^0([1-6][0-9]{8,10}|7[0-9]{9})$/),

        check("password", "messaggio: la password non deve contenere spazi")
            .customSanitizer((password) => password.replace(/\s/g, ""))
            .matches(/^0([1-6][0-9]{8,10}|7[0-9]{9})$/)
    ], async (req, res) => {
        EmailList.init();
        try {
        
            const { email, password } = req.body;

            //Se l'email non contiene @telematicainformatica.it
            if (!email.includes(ti)) {
                return res.send("email non valida")
            }

            //---------------------------------------------------Controllare che non ci siano caratteri particolari
            const emailTrovata = await EmailList.findOne({
                email: email, password: password
            })

            if (!emailTrovata) {
                console.log("Nessun account trovato")
                return res.status(401).json({ messaggio: "Nessun account trovato" })
            }

            const jwtToken = jwt.sign(
                { id: emailTrovata.id, email: emailTrovata.email, admin: emailTrovata.admin },
                'passwordsegreta'
            )
            console.log("Dati trovati: ", emailTrovata, " \nToken: ", jwtToken)
            res.cookie("token", jwtToken)
            res.json({ "email": emailTrovata.email, "admin": emailTrovata.admin, token: jwtToken })

        } catch (error) {
            res.status(500).json({ messaggio: error.message })
        }
    })


//inserisce un utente qualsiasi passando email, password e tipo di utente: true = admin, false = dipendente

routerEmail.post('/postEmailList',
    [
        check("email").isEmail().withMessage('email valida')
            .trim().withMessage('rilevati spazi')
            .escape()
            .normalizeEmail()
            .isLength({ min: 26 })
            .customSanitizer((email) => email.replace(/\s/g, ""))
            .matches(/^0([1-6][0-9]{8,10}|7[0-9]{9})$/),

        check("password", "messaggio: password ")

        // .isStrongPassword({
        //     minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false,
        //     pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10,
        //     pointsForContainingNumber: 10, pointsForContainingSymbol: 10
        // })
    ],
    async (req, res) => {

        const errors = validationResult(req);

        try {



            let nuovaEmail = new EmailList({
                _id: new ObjectId,
                email: req.body.email,
                password: req.body.password,
                admin: req.body.admin
            })

            //Se l'email non contiene @telematicainformatica.it
            if (!nuovaEmail.email.includes(ti)) {
                return res.send("email non valida")
            }


            //Controllo spazi ---------------------------------------------------- DA SISTEMARE

            if (nuovaEmail.password.includes(" ")) {
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
        // finally { console.log(errors.array()
        //     // .filter(x => x.path == "password") 
        //     )}
    })


//inserisce un dipendente
routerEmail.post('/postUserList', async (req, res) => {

})


module.exports = routerEmail;