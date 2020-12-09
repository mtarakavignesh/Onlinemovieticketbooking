var express = require('express');
var router = express.Router();
//var mongodb=require('mongodb');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const request = require('request');
const { json } = require('express');
const APIURL = 'http://localhost:3001/availablemovies';
var c=0;
/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(__dirname + "/" + "index.html");
});

router.get('/availablemovies',function(req,res,next){
  request(APIURL  ,

       function (error, response, body) {

           if (!error && response.statusCode == 200) {
               res.send(body);

           } else {

               console.log(response.statusCode + response.body);

               res.send({info: NULL});

           }

       });

  /*var db=req.db;
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
  }*/
  //res.sendFile(__dirname+"/"+"booknow.html");
});

router.get('/confirm',function(req,res,next){
  res.sendFile(__dirname+"/"+"confirm.html");
});
router.post('/valid',urlencodedParser,function(req,res){
    var movie=req.body.Movie;
    var name=req.body.Name;
    var email=req.body.Email;
    var qtty=req.body.NoOfTickets;
  var db = req.db;
        var collection = db.get('movies');
      collection.find({name:movie},function(e,docs){
        var data="[]";
        var data1=JSON.stringify(docs);
        if(data==data1)
        res.send("Movie UnAvailable");
        else {
          if(qtty>0)
          {
            var json_f=JSON.parse(data1);
            var n=json_f[0].available;
            var nx=n-qtty;
            if(n>=qtty)
            {
              var db2=req.db;
              var collection=db2.get('movies');
              collection.update({name:movie},{$set:{available:nx}});
              var db1=req.db;
              var collection = db1.get('userdetails');
             collection.insert({
                 "name" : name,
                 "movie" :movie,
                 "email":email,
                 "qtty":qtty
             },
             function (err, doc) {
                 if (err) {
                     // If it failed, return error
                     res.send("There was a problem adding the information to the database.");
                 }
                 else {
                     // And forward to success page
                    var text=JSON.stringify(doc);
                    var msg="Your details are Succesfully Saved and here are the details of your ticket!";
                    var ress=msg+text;
                    res.send(ress);
                 }
             });
           }
           else {
             res.send("No Available Tickets");
           }
          }
          else {
            res.send("Please Give the no of tickets");
          }
        }
      });
});
module.exports = router;
