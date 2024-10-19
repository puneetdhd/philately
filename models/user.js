const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Posts = require("./posts.js");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Posts"
        }
    ],
    social_insta:{
        type:String,
    },
    social_linkedin:{
        type:String,
    },
    social_facebook:{
        type:String
    }
});

//will include the posts section later on
userSchema.plugin(passportLocalMongoose)

const User= mongoose.model("User",userSchema);
module.exports=User;