var express = require('express');
var app=express();
const path= require('path');
var bodyParser=require('body-parser');
const http= require('http');

var mongoose=require("mongoose");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
const public_path= path.join(__dirname, "../public");
mongoose.connect("mongodb://user:password1@ds125293.mlab.com:25293/expirymed", function(err, db){
	if(!err)
		console.log("Server connected");
	else
		console.log("Disconnected");
});
const {Users} = require("./utils/users");
var User=require("../models/user.js");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var indexRoute=require("../routes/index.js");
var users = new Users();


const port= process.env.PORT || 3000;
app.use(express.static(public_path));
//^^^this is our http server
app.use(require("express-session")({
    secret: "First project",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});
app.use(indexRoute);


app.listen(port, function(){
	console.log("server on duty, mallady");
});