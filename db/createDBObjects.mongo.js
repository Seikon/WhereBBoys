//connect database
use wherebboysdb;
//Create index for querys
db.trainingPlaces.createIndex({countryKey: 1}, {name:"countryCodeIndex"});