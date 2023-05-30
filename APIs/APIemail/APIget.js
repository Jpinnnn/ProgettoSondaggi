const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { EmailList } = require('../../modelli/EmailList');
// const session = require('node-sessionstorage')

const routerEmail = express.Router();

//APIs qua

//controllo login account
routerEmail.get("/Login", async (req, res) =>{
    EmailList.init();
    try {
        const email = req.body.email;
        const password = req.body.password;

        const emailTrovata = await EmailList.findOne({
            email: email, password: password
        })

        if(!emailTrovata) {
            console.log("Nessun account trovato")
            return res.send("Nessun account trovato")
        }

        console.log (emailTrovata);
        
        // session.setItem("sessionEmail", emailTrovata.email)
        // session.setItem("sessionAdmin", emailTrovata.admin)
        // console.log (session.getItem("sessionEmail"));
        // console.log (session.getItem("sessionAdmin"));
        return res.send(emailTrovata)

    } catch (error) {
        res.status(500).json({messaggio: error.message})
    }
})



module.exports = routerEmail;