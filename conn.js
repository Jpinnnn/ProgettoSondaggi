const mongoose = require("mongoose");
const dbConnString = "mongodb://127.0.0.1:27017/dbSondaggi";

function connectToDb() {
  mongoose.connect(dbConnString);
  const dbConnection = mongoose.connection;

  dbConnection.on('error', (error) => {
    console.log(error)
  })
  dbConnection.once('connected', () => {
    console.log(`Connesso a MongoDB: ${dbConnString}`);
  })
}

module.exports = connectToDb;