const express= require ("express");
const app= express();
const User=require("./models/user");
const mongoose= require("mongoose");
const path=require("path");
const ejsMate = require("ejs-mate");
//const methodOverride= require("method-override");
const wrapAsync= require("./utils/wrapAsync");
const ExpressError= require("./utils/ExpressError");
app.use(express.static('public'));



const { stackTraceLimit } = require("./utils/ExpressError.js");
const { saveRedirectUrl } = require("./middleware.js");



const methodOverride=require("method-override");
const session=require("express-session");
const flash= require("connect-flash");
const passport=require("passport");
const LocalStratergy=require("passport-local");



const MONGO_URL= 'mongodb://127.0.0.1:27017/prototype';

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
app.set("view engine","ejs");


app.set("view engine", "ejs");
app.set("views" ,path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
//app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));



//session details

const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());







//middleware for flash
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser= req.user;
    next();
});





app.get("/",async(req,res)=>{
    res.render("pages/home.ejs");
});

app.get("/login",async(req,res)=>{
    res.render("pages/login.ejs");
});

app.get("/signup",async(req,res)=>{
    res.render("pages/signup.ejs");
});


app.get("/explore",async(req,res)=>{
    res.render("pages/explore.ejs");
});

app.get("/profile",async(req,res)=>{
    res.render("pages/profile.ejs");
});

app.get("/stampcalendar",async(req,res)=>{
    res.render("pages/stampcalendar");
})

app.get("/rarestamp",async(req,res)=>{
    res.render("pages/rarestamp");
});


app.get("/testschema",async(req,res)=>{
    let sampleSchema=new Profile({
        name:"Rahul",
        email:"rahul323@gmail.com",
        
    })
});



app.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

app.post(
    "/signup",
    wrapAsync(async(req,res)=>{
    
    try{
        let {name,username,email,password}=req.body;
        const newUser=new User({name,email,username});
        const resgisteredUser= await User.register(newUser, password);
        req.login(resgisteredUser,(err)=>{
            if(err){
                
                return next(err);
            }
            req.flash("success","Welcome to Philately India");
            res.redirect("/explore");
            
        });

    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }

}));


app.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local",{
        faliureRedirect:"/login",
        faliureFlash:true
    }),
        async(req,res)=>{
            req.flash("Welcome back to Philately!You are logged in!");
            res.redirect("/explore");
})


app.get("/logout",(req,res)=>{
    req.logOut((err)=>{
        
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out now");
        res.redirect("/")
    })
});






//when directed to a wrong page we gonna show page not found

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
})


//error handler
app.use((err, req, res, next) => {
    // Ensure err is an object to avoid destructuring errors
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    res.status(statusCode).render("error.ejs", { message, statusCode });

});



app.listen(3030,()=>{
    console.log("server is responding on port 3030");
});
