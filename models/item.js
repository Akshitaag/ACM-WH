var mongoose=require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var itemSchema= new mongoose.Schema({
    name   : String,
    image  : String,
    expiryDate: String,
    cost :Number,
     username: {
      id:{ 
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username: String,
      unique: false
   }
});
module.exports= mongoose.model("Item",itemSchema);