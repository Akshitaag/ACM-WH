var express = require("express");
var moment = require("moment");
var router  = express.Router();
var User=require("../models/user.js");
var passport=require("passport");
var Item=require("../models/item.js");
fileUpload = require('express-fileupload');
var PythonShell = require('python-shell'),
sys = require('sys');
app.use(fileUpload());


//AUTH ROUTES

//  REGISTER


router.get("/register",function(req,res){
    res.sendFile("/home/rahmeen/Desktop/ACM-WH/public/register.html");
   // res.sendFile("C:/Users/hp/Desktop/Expiry/public/register.html");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username,latitude: req.body.latitude, longitude: req.body.longitude});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
        //    req.flash("error",err.message);
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
           // req.flash("success","Welcome to our app "+ req.body.username);
           res.redirect("/login"); 
        });
    });
});
//LOGIN 
router.get("/login",function(req,res){
    res.render("login");
});

    

router.get("/login",function(req,res){
    res.render("login");
});
router.post("/login", passport.authenticate("local", 
    {
        failureRedirect: "/login"
    }), function(req, res){
        /* User.findAll({"username":req.body.username},function(err,allusers)
{
        res.render("buysell", {id : allusers[0].id});
});*/
User.find({username : req.body.username}, function(err, result) {
    if (err) throw err;
    res.render("buysell", {id : result[0]._id});
});
});
/*router.get("/:sid/buy", function(req, res) {
    res.render("buy", {id: req.params.sid})
});

router.get("/:sid/sell", function(req, res) {
    res.render("sell", {id: req.params.sid})
});*/

router.get("/:id/sell",function(req,res){
    User.findById(req.params.id,function(err,allusers)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
         
           Item.find({"username.id" :req.params.id}, function(err, items){
               //console.log(items);
     if(err)
     {
         console.log(err);
     }
     else 
        res.render("UserProf", {user: allusers, id: req.params.id,items:items});
     });
        
    }
});
});

router.get("/:sid/items/new", function(req, res){
    res.render("new",{id:req.params.sid});
    
});

router.post("/:sid/items", function(req, res){
    //Item.create(req.body.item, function(err, newitem){
      var sid=req.params.sid;
    User.findById(req.params.sid,function(err,found)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
        //console.log(found);
            var username={
            id:found._id,
            username:found.username,
            latitude: found.latitude,
            longitude: found.longitude
          };
           var item = new Item({
           name: req.body.item.name,
           expiryDate: req.body.item.expiryDate,
           image: req.body.item.image,
           cost: req.body.item.cost,
           username: username
          });

      item.save(function(err){
        if(!err){
         
              res.redirect("/"+req.params.sid+"/sell");
            }
        else
        console.log(err);
      });
            
    }
});
        
      //  res.redirect("/items");
    //});
    
});

router.get("/:id/buy",function(req,res){
    res.sendFile("/home/rahmeen/Desktop/ACM-WH/public/sellform.html");
   // res.sendFile("C:/Users/hp/Desktop/Expiry/public/sellform.html");
});
 router.post("/sellform", function(req, res){
   var byCost = [],
       byDate = [],
       byDistance = []; 
        Item.find({name : req.body.medicine}).sort({cost : 'ascending'}).exec(function(err, docs){
            if(err)
            console.log(err);
            else {
            //console.log(docs);
            byCost  = docs;
            Item.find({name : req.body.medicine}).sort({expiryDate : 'ascending'}).exec(function(err, docs){
                if(err)
                console.log(err);
                else {
                console.log(docs);
                    byDate = docs;
                    res.render("sorted", {byCost : byCost, byDate:byDate});
                }        
            });
            }        
        });
    });
router.get("/:sid/:iid/:medi/upload", function(req, res){
    res.render("upload", {medi : medi})
});
router.post('/upload', function(req, res) {
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
    console.log('body'+req.body);
    let sampleFile = req.files.sampleFile;
    var filename = req.files.sampleFile.name;
    var medi = req.body.medi;

      // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(__dirname+'/data/'+filename, function(err) {
      if (err)
        return res.status(500).send(err);
   
    var options = {
    mode: 'text',
    pythonPath: "C:/Users/hp/Anaconda3-2/python.exe",
    pythonOptions: ['-u'],
    scriptPath: './',
    args: []
  };
  
  /*var shell = new PythonShell('msocr_1.py', options);
  shell.on('message', function (message) {
  
      var len = message.length;
    var fs = require('fs');
    var obj;
    fs.readFile('output', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log((obj));
    res.render("result", {obj:obj});
  });
  
  });*/
  
    });
  });
//LOGOUT
router.get("/logout",function(req,res){
   req.logout(); 
  // req.flash("success","Logged You Out!!");
   res.redirect("/");
});

module.exports = router;
