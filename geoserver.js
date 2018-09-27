var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require('fs');
var ModelDB = require("./Model/ModelDB");

var model;

var SUPPORTED_LANGUAJES = {

    ES : 1,
    EN: 2,
    DE : 3
};

model = new ModelDB();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Geo Server access Time: ', Date.now());
  next();
});

router.get('/sites/training/:id', function(req, res) {

    res.setHeader('Content-Type', 'application/json');

    model.getTrainingPlaces(req.params.id).toArray(function(err, data){
        
        if(err)
            res.status(500).send("We cant serve the training Sites of this country");
        else
        {
            res.send(data);
        }
    });
});

router.get('/sites/danceschools/:id', function(req, res) {
    res.send('Hello World!');
});

router.get('/worldmap', function(req, res) {
    fs.readFile('geoData/worldmap.geo.json', 'utf8', function (err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

module.exports = router;