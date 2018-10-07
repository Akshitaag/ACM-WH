var express = require("express");
var moment = require("moment");
var router  = express.Router();
var User=require("../models/user.js");
var passport=require("passport");



//AUTH ROUTES

//  REGISTER


router.get("/register",function(req,res){
    res.render("register.ejs");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
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
        successRedirect: "/buysell",
        failureRedirect: "/login"
    }), function(req, res){
});


//LOGOUT
router.get("/logout",function(req,res){
   req.logout(); 
  // req.flash("success","Logged You Out!!");
   res.redirect("/");
});

module.exports = router;
