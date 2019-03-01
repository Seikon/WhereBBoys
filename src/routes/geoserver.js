const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require('fs');
const ModelDB = require("../Models/ModelDB");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Geo Server access Time: ', Date.now());
  next();
});

router.get('/sites/training', function(req, res) {

    const countryKey = req.query.countryKey;
    const modelDB = new ModelDB();

    modelDB.connect().then(
    function(){

        modelDB.getTrainingPlaces(countryKey).then(
        function(trainingPlaces)
        {
            res.setHeader('Content-Type', 'application/json');
            res.send(trainingPlaces);
        },
        function(err){
            res.status(500).send("Error in training places");
        });

    },
    function(err){
        res.status(500).send("Error in training places");
    });

});

router.get('/sites/danceschools', function(req, res) {
    //Not implemented yet!
});

router.get('/worldmap', function(req, res) {
        fs.readFile(path.join(__dirname, '../geoData/worldmap.geo.json'), 'utf8', function (err, data) {
            if(err)
            {
                res.status(500).send("Internal server error");
            }
            else
            {
                res.setHeader('Content-Type', 'application/json');
                res.send(data);
            }
        });
});

module.exports = router;