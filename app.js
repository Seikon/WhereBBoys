var express = require('express');
var app = express();
var languajes = require("./languaje");

app.use("/en", languajes);
app.use("/es", languajes);
app.use("/de", languajes);

//This controller check the IP Location of the request
//and redirect to ES, EN, DE languaje (EN default)
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});