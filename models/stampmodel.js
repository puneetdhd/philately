const mongoose= require("mongoose");
const Schema= mongoose.Schema;


const stampSchema= new  Schema({
    stamp_name:{
        type:String,
        required:true,
    },
    stamp_image:{
        type:String,
        required:true
    },
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    cereatedAt:{
        type:Date,
        default:Date.now()

    }
})

const Stamp=mongoose.stampSchema;
module.exports=Stamp;
