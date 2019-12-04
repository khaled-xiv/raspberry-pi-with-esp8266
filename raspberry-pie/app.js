// Imports
var express = require('express');
var app = express();

// View engine
app.set('view engine', 'jade');

// Set public folder
app.use(express.static(__dirname + '/public'));

// node-aREST
var rest = require("arest")(app);
rest.addDevice('http','172.20.10.9');

// Interface routes
app.get('/', function(req, res){
  res.render('index');
});

// Start server
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
