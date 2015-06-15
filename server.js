var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');

var server = express();

var jsonParser = bodyParser.json();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

var router = require('./router')(server);

/////// data handling //////
var csv = require('fast-csv');
var phoneList = {};
var stream = fs.createReadStream("interview-callerid-data.csv");

csv
  .fromStream(stream)
  .transform(function(row){
  		//this function reads a row from the file
  		//it formats the number into E.164 format before storage
  		//and stores the row into the phoneList
  		var tempNumber = row[0];
  		tempNumber = tempNumber.replace(/[-() ]+|\+1/g, ''); //number being formatted correctly
  		tempNumber = '+1' + tempNumber;

  		if (phoneList[tempNumber] == undefined) // if number not present already
  			phoneList[tempNumber] = []; // add it to hashmap with an empty value

  		//add the new name and context alongside the appropriate key
  		phoneList[tempNumber].push({ name:'' + row[2] + '', number:'' + tempNumber + '', context:'' + row[1]+''});
    })
  .on("data", function(data){
  		//nothing
   })
  .on("end", function(){
		var port = process.argv[2];
		// once data has been read and stored, start the server
		server.listen(port,function(){
			console.log("Started on PORT " + port);
		})

  });

exports.server = server;
exports.phoneList = phoneList;