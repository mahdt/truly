//code for /number call goes here
var server = require('../../server');
var phoneList = server.phoneList;
var express = require('express');
var router = express.Router();


router.post('/', function(req, res){
	var phoneList = server.phoneList;
	console.log("Handler for /number called");
	console.dir(req.body);
	var duplicateFlag = false;
	var tempNumber = req.body.number;
	tempNumber = '+1' +tempNumber.replace(/[-() ]+|\+1/g, '');
	if (phoneList[tempNumber] == undefined) {
  		phoneList[tempNumber] = [];
	}
  	else {
  		console.log("size " +phoneList[tempNumber].length);
  		for (var i = 0; i < phoneList[tempNumber].length; i++) {
  			console.log("here");
  			console.log(phoneList[tempNumber][i].context + " " + req.body.context);
  			if (phoneList[tempNumber][i].context == req.body.context) {
  				res.end("Already exists");
  				duplicateFlag = true;
  				break;
  			}
  		}
	}
	if (!duplicateFlag) {
		phoneList[tempNumber].push({ name:'' + req.body.name + '', number:'' + tempNumber + '', context:'' + req.body.context+''});
		console.log(phoneList[tempNumber]);
		res.end("successful");
	}
});




module.exports = router;

