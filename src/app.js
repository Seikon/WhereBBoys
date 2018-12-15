var express = require('express');
var app = express();
var structure = require("./structure");
var geoserver = require("./geoserver");
var helmet = require('helmet');
var path = require('path');

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, './Views'));

app.use(helmet());

app.use("/en", structure);
app.use("/es", structure);
app.use("/de", structure);

//This controller initiallizes the geoserver
//with GeoJson data endpoints.
app.use("/geoserver", geoserver);

app.use(express.static(path.join(__dirname, './public')));

//This controller check the IP Location of the request
//and redirect to ES, EN, DE languaje (EN default)
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Running at port 3000!');
});