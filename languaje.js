var express = require('express');
var router = express.Router();

var SUPPORTED_LANGUAJES = {

    ES : 1,
    EN: 2,
    DE : 3
};

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
    }

    next();
});

// define the home page route
router.get('/', function(req, res) {
    res.send('Hello World!');
});
// define the about route
router.get('/map', function(req, res) {
  res.send('Map App');
});

router.get('/contributors', function(req, res) {
    res.send('Contributors');
});

router.get('/about', function(req, res) {
    res.send('about');
});

module.exports = router;