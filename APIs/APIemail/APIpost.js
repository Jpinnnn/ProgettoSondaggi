const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { EmailList } = require('../../modelli/EmailList');

const routerEmail = express.Router();


//APIs qua

//inserisce un utente qualsiasi
routerEmail.post('/postEmailList', async(req, res)=>{

})



//inserisce un amministratore
routerEmail.post('/postAdminList', async(req, res)=>{
    try {
        
        const ti = "@telematicainformatica.it"

        const nuovaEmail = new EmailList({
            _id: new ObjectId,
            email: req.body.email,
            password: req.body.password,
            admin: true
        })


        if(!req.body.email || !req.body.password ||
            req.body.email == "''" || req.body.email == '""' ||
            req.body.password == "''" || req.body.password == '""'
            )
        {
            return res.send("nessuna email o password inserita")
        }

        //Se l'email non contiene @telematicainformatica.it
        if(!nuovaEmail.email.includes(ti)){
            return res.send("email non valida")
        }
        
        // if(!req.body.email){
        //     return res.send("nessuna email inserita")
        // }
        // if(!req.body.password){
        //     return res.send("nessuna password inserita")
        // }

        await nuovaEmail.save();

        console.log(nuovaEmail)
        return res.send(nuovaEmail)

    } catch (error) {
        res.status(500).json({messaggio: error.message})
    }
})



//inserisce un dipendente
routerEmail.post('/postUserList', async(req, res)=>{

})


module.exports = routerEmail;