var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

class ModelDB
{
    constructor() 
    {
        MongoClient.connect(url).then(function(db)
        {
            var dbo = db.db("trainingPlaces");
            this.dbo = dbo;

        }.bind(this));
    }

    getTrainingPlaces(country)
    {
        return this.dbo.collection("trainingPlaces").find({countryKey: country});
    }

}

module.exports = ModelDB;