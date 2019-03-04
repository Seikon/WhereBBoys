var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require('fs');

//Get the configuration file from json files
var SUPPORTED_LANGUAJES = JSON.parse(fs.readFileSync(path.join(__dirname, "configuration/languajesSupported.json"), 'utf8'));
console.log('Suported languajes sucessfully loaded. Time: ', Date.now());
//List the supported languajes
console.log(JSON.stringify(Object.keys(SUPPORTED_LANGUAJES)));

var MESSAGES_LANGUAJES = JSON.parse(fs.readFileSync(path.join(__dirname, "configuration/multilanguajeMessajes.json"), 'utf8'));
console.log('Messages for suported languajes sucessfully loaded, Time: ', Date.now());

console.log('Time: ', Date.now());


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
//Catch the languaje
router.use(function(req, res, next)
{
    switch(req.baseUrl)
    {
        case "/es":
        res.locals.languajeApp = SUPPORTED_LANGUAJES.ES;
        break;

        case "/en":
        res.locals.languajeApp = SUPPORTED_LANGUAJES.EN;
        break;

        case "/de":
        res.locals.languajeApp = SUPPORTED_LANGUAJES.DE;
        break;

        default:
        res.locals.languajeApp = SUPPORTED_LANGUAJES.EN;
        break;
    }

    next();
});

// Define the home page route
router.get('/', function(req, res) {
    res.send('Hello World!');
});

// define the multi-languaje-resource route
router.get('/message', function(req, res) {

  });

// define the map route
router.get('/map', function(req, res) {
  res.render("index", {UIMessages: MESSAGES_LANGUAJES[res.locals.languajeApp]});
});
// define the contributors route
router.get('/contributors', function(req, res) {
    res.send('Contributors');
});
// define the help route
router.get('/about', function(req, res) {
    res.send('about');
});

module.exports = router;