var express = require('express');
var router = express.Router();
var path = require("path");

router.get("/lenguajesSupported", function(req, res) {

    const SUPPORTED_LANGUAJES = JSON.parse(fs.readFileSync(path.join(__dirname, "configuration/languajesSupported.json"), 'utf8'));
    res.setHeader('Content-Type', 'application/json');
    res.send(SUPPORTED_LANGUAJES);
});

router.get("/multilanguajeSupported", function(req, res) {

    const MESSAGES_LANGUAJES = JSON.parse(fs.readFileSync(path.join(__dirname, "configuration/languajesSupported.json"), 'utf8'));
    res.setHeader('Content-Type', 'application/json');
    res.send(MESSAGES_LANGUAJES);
});

module.exports = router;