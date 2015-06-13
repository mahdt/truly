var express = require("express");
var bodyParser = require("body-parser");

var server = express();

var jsonParser = bodyParser.json();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

var router = require('./router')(server);
var port = process.argv[2];

server.listen(port,function(){
	console.log("Started on PORT " + port);
})

module.exports = server;