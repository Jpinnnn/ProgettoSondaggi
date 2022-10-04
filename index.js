const express = require("express")
const cors = require('cors');
const connectToDb = require('./conn.js');
                                                            //const router = require('./routes.js')
const APIsondaggi = require('./APIs/APIsondaggi.js')
//const APIutenti = require('./APIs/APIutenti.js')

const os = require("os");
const { writeFile } = require("fs");
const { readFile } = require("fs");

const emailList = require("./moduli/email-list");
const prove = require ("./prove/prove");


const app = express()
app.use(cors());
app.use(express.json());

                                                            // app.use('/API', router);
                                                            // app.use(require('./routes.js'));

app.use('/API', APIsondaggi);
//app.use(require('./APIs/APIsondaggi.js'));
// app.use('/API', APIutenti);
// app.use(require('./APIs/APIutenti.js'));


const port = 3000;

connectToDb();

app.listen(port, () =>{
    console.log(`L'app è in ascolto sulla porta ${port}`)
})

