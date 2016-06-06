var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET list of devices page. */
router.get('/devices', function(req, res, next) {
  res.render('devices', { title: 'List of Devices' });
});

/* GET list of accounts page. */
router.get('/accounts', function(req, res, next) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('accounts', {
      "accounts" : docs
    });
  });
});

/* add a new account */
router.get('/addaccount', function(req, res, next) {
  res.render('addaccount', { title: 'Add a New User Account' });
});

/* handle the POST request for adding new account */
router.post('/addaccount', function(req, res) {
	var db = req.db;
	var username = req.body.username;
	var email = req.body.email;
	var collection = db.get('usercollection');
	/* insert a new record to the database */
	collection.insert({
		"username" : username,
		"email" : email
	}, function (err, doc) {
		if (err) {
			res.send("Fail to add a new account to the database");
		}
		else { // return to addaccount view so you can add more record
			res.redirect("addaccount");
		}
	});
});

module.exports = router;
