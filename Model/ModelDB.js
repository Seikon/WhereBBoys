var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

class ModelDB
{
    constructor() 
    {
        MongoClient.connect(url).then(function(db)
        {
            var dbo = db.db("wherebboysdb");
            this.dbo = dbo;
            console.log("Db connection succesful!");

        }.bind(this));
    }

    getTrainingPlaces(country,callback)
    {
        return this.dbo.collection("trainingPlaces").find({countryKey: country}).toArray(function(err, trainingPlaces)
        {
            if(err)
            {
                throw new("Error getting training places");
            }
            else
            {
                callback(trainingPlaces);
            }
        });
    }

}

module.exports = ModelDB;