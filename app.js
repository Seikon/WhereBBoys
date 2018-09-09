var express = require('express');
var app = express();
var structure = require("./structure");
var resources = require("./resources");

app.use("/en", structure);
app.use("/es", structure);
app.use("/de", structure);

app.use('js', express.static('js'));
app.use('css', express.static('css'));

//This controller check the IP Location of the request
//and redirect to ES, EN, DE languaje (EN default)
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});