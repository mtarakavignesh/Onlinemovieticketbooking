var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const request = require('request');
const { json } = require('express');
var c=0;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/availablemovies', function(req, res, next) {
    //res.send("Successfully called service2");
    var db=req.db;
    var collection = db.get('movies');
    if(c==0)
    {
      c=c+1;
        collection.insert([{
            "name" : "tenet",
            "available" :20
        },{"name":"color photo","available":60},
        {"name":"365 days","available":80},
        {"name":"Loser","available":100},
        {"name":"Mr bean","available":70}],
        function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // And forward to success page
               res.json(doc);
            }
        });
    }
    else {
      collection.find({},{},function(e,docs){
          res.json( docs);
      });
    }
});

module.exports = router;
