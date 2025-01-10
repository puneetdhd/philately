//here will be the code to initialize the data given in data.js

const mongoose = require("mongoose");
const initData = require("./data.js");

const Stamp = require("../models/stampmodel.js");

const MONGO_URL= 'mongodb+srv://Puneet:init01234@philately.fuivl.mongodb.net/prototype';



async function main(){
    await mongoose.connect(MONGO_URL);
}


main()
    .then(()=>{
    console.log("connected to db");
    })
    .catch((err)=>{
        console.log(err);
    })


const initDB= async ()=>{
    // await Stamp.deleteMany({});
    await Stamp.insertMany(initData.data);
    console.log("data was initialized");
};
    
initDB();