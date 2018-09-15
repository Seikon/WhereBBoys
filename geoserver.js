var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require('fs');

var SUPPORTED_LANGUAJES = {

    ES : 1,
    EN: 2,
    DE : 3
};

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Geo Server access Time: ', Date.now());
  next();
});

router.get('/sites/training', function(req, res) {
    res.send('Hello World!');
});

router.get('/sites/danceschools', function(req, res) {
    res.send('Hello World!');
});

router.get('/worldmap', function(req, res) {
    fs.readFile('geoData/worldmap.geo.json', 'utf8', function (err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

module.exports = router;