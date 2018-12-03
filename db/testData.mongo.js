//connect database
use wherebboysdb;
//Coordinates must be in WGS84-GEO (EPSG:4326) spatial reference
db.trainingPlaces.insert({address: "Plaza Cervantes", coordinates : { lon: -3.364444, lat: 40.482822,}, contactPerson:{name: "Alejandro",surName: "Fernandez",aka: "Seikon",crew: "Street Law",email: "afernandezperez93@gmail.com",telefon: "697182352",facebook: "",instagram: "",},type: "Ocasional",countryKey: "ES"});