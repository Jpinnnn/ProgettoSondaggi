const express = require("express")
const cors = require('cors');
const connectToDb = require('./conn.js');
const router = require('./routes.js')
const emailList = require("./moduli/email-list");
const os = require("os");
const { writeFile } = require("fs");
const { readFile } = require("fs/promises");
const Ciao = require("./prove/proveLetturaScrittura.js");


const app = express()
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(require('./routes.js'));

const port = 3000

connectToDb();

app.listen(port, () =>{
    console.log(`L'app è in ascolto sulla porta ${port}`)
})

//console.log("process: ", process);
//emailList.stampaEmail();

//console.log("Il PC è aperto da ", (os.uptime()/60/60), " ore")

// const letturaScritturaFile = require ("./prove/proveLetturaScrittura");
// letturaScritturaFile.scrittore("Silenzio :C")
// letturaScritturaFile.lettore();