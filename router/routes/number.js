//code for /number call goes here
var server = require('../../server');
var express = require('express');
var router = express.Router();


router.post('/', function(req, res){
	var phoneList = server.phoneList;

	var duplicateFlag = false; // flag to keep track of duplicate entries

	var num = req.body.number;

	if (num != undefined && req.body.context != undefined && req.body.name != undefined) {
	// proceed because all three key value pairs that were expected were received	
		num = num.replace(/[-() ]+|\+1/g, '');
		if (isNaN(num) || num.length != 10) { // if the value of key number was incorrect
			res.status(400).end("Bad Request"); // send bad request
		} else {
			// check if number already present
			num = '+1' + num;
			if (phoneList[num] == undefined) {
		  		phoneList[num] = []; // add key to hashmap
			}
		  	else {
		  		// number was already present
		  		// check if it is present in came context
		  		for (var i = 0; i < phoneList[num].length; i++) {
		  			if (phoneList[num][i].context == req.body.context) {
		  				// number is indeed present with same context
		  				// send duplicate error code
		  				res.status(409).end("A number with this context already exists");
		  				duplicateFlag = true;
		  				break;
		  			}
		  		}
			}
			if (!duplicateFlag) {
				//number in this context was not present so now we add it
				phoneList[num].push({ name:'' + req.body.name + '', number:'' + num + '', context:'' + req.body.context+''});
				res.end("Success");
			}
		}
	} else {
		res.status(400).end("Bad Request"); // sent if all three key value pairs not received
	}
});




module.exports = router;

