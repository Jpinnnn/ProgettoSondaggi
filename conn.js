const mongoose = require("mongoose");
const dbConnString = "mongodb://localhost:27017/dbSondaggi";

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