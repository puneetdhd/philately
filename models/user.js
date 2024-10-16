const mongoose =require("mongoose");
const Schema= mongoose.Schema;
//const Post= require("./posts");

const passportLocalMongoose=require("passport-local-mongoose");


const userSchema= new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        requied:true
    },
});


//will include the posts section later on
userSchema.plugin(passportLocalMongoose)

const User= mongoose.model("User",userSchema);
module.exports=User;