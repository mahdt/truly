//code for /query call goes here
var server = require('../../server');
var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
	var phoneList = server.phoneList;
	
	var num = req.query.number;
	if (num != undefined) { //if a key value pair with key number was sent, proceed
		if (isNaN(num.replace('+', '')) || num.length != 12) // make sure the value is a number with 11 digits preceded by +
  			res.status(400).end("Bad Request"); // otherwise send bad request
  		else {
  			// number was sent correctly, now search
  			var result = phoneList[req.query.number];
  			if (result == undefined) {
  				res.status(404).end("Number not found."); // send 404 if not found
  			} else {
  				// send result in json format if found
	  			var str = "{results: " + JSON.stringify(phoneList[req.query.number]) + "}";
				res.send(str);
			}
  		}
	} else {
		//if url was incorrectly formatted
		res.status(400).end("Bad Request");
	}
});




module.exports = router;

