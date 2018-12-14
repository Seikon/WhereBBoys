//Read createDatabase.mongo.js for more details
//Ensure that trainingPlaces collection has been create
//Connect to database
use wherebboysdb;
//Insert data
db.trainingPlaces.insert({address : "Plaza Cervantes",coordinates : {lon : -3.364501, lat : 40.482919, wkid:4326}, contactPerson : {name : "Alejandro",surname : "Fernandez",aka : "Seikon",crew : "SLC",email : "afernandezperez93@gmail.com",telefon : "697182352" },type : "Ocasional", "countryKey" : "ES"});



