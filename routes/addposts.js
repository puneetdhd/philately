// the path for this folder is only for adding new posts as we need url encoded as false
//i am not adding it for now ill add it as soon as i am done with the rest stuff

const express= require("express");
const wrapAsync= require("../utils/wrapAsync");
const ExpressError= require("../utils/ExpressError");
const multer=require("multer");

application.use(url.encoded({extended:false}));


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"../uploads");
    },
    //destination tells where you got to store the file
    //file is the file user is trying to send
    //cb is callback
    filename:function(req,file,cb){
        return cb(null,`${req.user._id}-${file.originalname}`);
        //here the name will be saved with name we will add certain 
        //parameteres to the name so as to multiple users can input file with
        //the same name  (so we appended the date to it to prevent clash)
    },
})

const upload=multer({storage});

application.post("/upload",upload.single("profileimage"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    

    res.redirect("/explore/users");
})

//"profile image" is the name used for that input form
