//code for /query call goes here
var server = require('../../server');
var phoneList = server.phoneList;
var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
	var phoneList = server.phoneList;
	console.log("Handler for /query called");
	console.dir("req is " + req.body.toString());
	var str = "{results: " + JSON.stringify(phoneList[req.query.number]) + "}";
	console.log(str);
	console.log(req.query.number);
	console.log(phoneList['+13853043918'][0].context);
	res.end(str);
});




module.exports = router;

