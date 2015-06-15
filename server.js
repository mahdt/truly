var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');

var server = express();

var jsonParser = bodyParser.json();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

var router = require('./router')(server);

///////
var csv = require('fast-csv');
var phoneList = {};
var stream = fs.createReadStream("smallcsv.csv");
//.fromString('82,boss,Zbigniew\n92,worker,Serge\n12,friend,Xilo\n92, worker.home, Zbigniew\n')
csv
  .fromStream(stream)
  .transform(function(row){
  		var tempNumber = row[0];
  		tempNumber = '+1' +tempNumber.replace(/[-() ]+|\+1/g, '');
  		if (phoneList[tempNumber] == undefined)
  			phoneList[tempNumber] = [];
  		phoneList[tempNumber].push({ name:'' + row[2] + '', number:'' + tempNumber + '', context:'' + row[1]+''});
  		//console.log(phoneList);
    })
  .on("data", function(data){
     //console.log(data);
 })
 .on("end", function(){
 	console.log(phoneList);
    console.log(phoneList['+13853043918'][0].context);
	var port = process.argv[2];
	console.log(port);
	server.listen(port,function(){
	console.log("Started on PORT " + port);
})

 });
 /////////


exports.server = server;
exports.phoneList = phoneList;
exports.hello = 3;