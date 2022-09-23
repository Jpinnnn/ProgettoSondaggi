const emailList = [
                        "porpigliagiuseppe",
                        "gattovalentina",
                        "pippo"
                  ];

const emailDomain = "@telematicainformatica.it";

//Concatena il nome della mail con il dominio
for (i in emailList){
    emailList[i] = emailList[i].concat(emailDomain);
}

//Stampa in console tutto l'array di email
const stampaEmail = () => {
    for(i in emailList){
        console.log(emailList[i]);
    }
}

module.exports = {emailList, stampaEmail};