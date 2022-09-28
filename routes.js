const express = require('express');
const ObjectId = require('mongodb').ObjectId; //const { ObjectId } = require("mongodb");
const router = express.Router();
const { User } = require('./modelli/Utenti.js');
const { Sondaggi } = require("./modelli/Sondaggi");

router.get('/getAll', async (req, res) => {

    try {
        //res.send('Get All API');
        //const mongoId = new ObjectId(req.params.id)   
        const users = await User.find();
        console.log(users);
        res.send(users);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

router.get('/getSondaggi', async (req, res) => {
    try {
        const arraySondaggi = await Sondaggi.find();
        console.log(arraySondaggi);
        res.send(arraySondaggi);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.post("/postUtente", async (req, res) => {
    const postUser = new User({
        nome: req.body.nome,
        cognome: req.body.cognome,
        eta: req.body.eta,
        citta: req.body.citta
    })
    await postUser.save();
    
    console.log(postUser);
    res.send(postUser);
})


module.exports = router;

