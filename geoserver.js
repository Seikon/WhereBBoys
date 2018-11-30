var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require('fs');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Geo Server access Time: ', Date.now());
  next();
});

router.get('/sites/training', function(req, res) {
    //Not implemented yet!
});

router.get('/sites/danceschools', function(req, res) {
    //Not implemented yet!
});

router.get('/worldmap', function(req, res) {
    fs.readFile('geoData/worldmap.geo.json', 'utf8', function (err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

module.exports = router;