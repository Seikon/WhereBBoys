const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

class ModelDB
{
    constructor()
    {
        this.dbo = null;
    }

    connect()
    {
        return MongoClient.connect(url).then(function(db)
        {
            this.dbo = db.db("wherebboysdb");
            console.log("Db connection succesful!");

        }.bind(this)).then();
    }

    getTrainingPlaces(country)
    {
        return new Promise((resolve, reject) => 
        {
            this.dbo.collection("trainingPlaces").find({countryKey: country}).toArray(
            function(err, trainingPlaces) 
            {
                if(err)
                {
                    reject(err);
                }
                else
                    resolve(trainingPlaces);
            });
        });
    }

}

module.exports = ModelDB;