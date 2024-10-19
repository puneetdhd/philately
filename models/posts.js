const mongoose =require("mongoose");
const Schema= mongoose.Schema;


const postSchema=new Schema({
    User:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    img:{
        type:String,
        required:true,
    },
    caption:{
        type:String,
    }
})

const Posts=mongoose.model("Post",postSchema);
module.exports=Posts;