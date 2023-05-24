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
        

        const nuovaEmail = new EmailList({
            _id: new ObjectId,
            email: req.body.email,
            password: req.body.password,
            admin: true
        })

        // if(Object.keys(req.body.email).length === 0){
        //     console.log("email errata")
        //     return res.send("email errata")
        // }

        // console.log(Object.keys(req.body.email))

        if(!req.body.email){
             return res.send("nessuna email inserita")
        }
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