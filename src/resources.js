var express = require('express');
var router = express.Router();
var path = require("path");

//-----CSS End point resource files
router.get("/css/map", function(req, res) {

    res.sendFile((path.join(__dirname+'/css/map.css')));
});

//-----Javascript End point resource files
router.get("/js/map", function(req, res) {

    res.sendFile((path.join(__dirname+'/js/map.js')));

});

router.get("/js/MapController", function(req, res) {

    res.sendFile((path.join(__dirname+'/js/map.js')));

});

router.get("/js/MapController", function(req, res) {

    res.sendFile((path.join(__dirname+'/js/bootstrap/js/bootstrap.bundle.min.js')));

});

module.exports = router;