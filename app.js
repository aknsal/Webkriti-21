require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.use(session({
  secret : "Its a Sceret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true},{ useUnifiedTopology: true });
mongoose.set("useCreateIndex",true);
const userSchema = new mongoose.Schema ({
  email:String,
  password:String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());







app.get("/",function(req,res){
  if(req.isAuthenticated()){
    res.render("home",{Log:"Logout", permission:"1"});
    console.log("Login Successful");
  }
  else {
    res.render("home",{Log:"Login", permission:"2"})
    console.log("login Unsuccessful");
  }


});

app.get("/sarasva",function(req,res){
  if(req.isAuthenticated()){
    res.render("sarasva",{Log:"Logout", permission:"1"});
    console.log("Login Successful");
  }
  else {
    res.render("sarasva",{Log:"Login", permission:"2"})
    console.log("login Unsuccessful");
  }
});

app.get("/geneticx",function(req,res){
  if(req.isAuthenticated()){
    res.render("geneticx",{Log:"Logout", permission:"1"});
    console.log("Login Successful");
  }
  else {
    res.render("geneticx",{Log:"Login", permission:"2"})
    console.log("login Unsuccessful");
  }
});

app.get("/virtuosi",function(req,res){
  if(req.isAuthenticated()){
    res.render("virtuosi",{Log:"Logout", permission:"1"});
    console.log("Login Successful");
  }
  else {
    res.render("virtuosi",{Log:"Login", permission:"2"})
    console.log("login Unsuccessful");
  }
});

app.get("/rangtaringini",function(req,res){
  if(req.isAuthenticated()){
    res.render("rangtaringini",{Log:"Logout", permission:"1"});
    console.log("Login Successful");
  }
  else {
    res.render("rangtaringini",{Log:"Login", permission:"2"})
    console.log("login Unsuccessful");
  }
});

app.get("/nirmiti",function(req,res){
  if(req.isAuthenticated()){
    res.render("nirmiti",{Log:"Logout", permission:"1"});
    console.log("Login Successful");
  }
  else {
    res.render("nirmiti",{Log:"Login", permission:"2"})
    console.log("login Unsuccessful");
  }
});

app.get("/thunderbolt",function(req,res){
  if(req.isAuthenticated()){
  res.render("thunderbolt",{Log:"Logout", permission:"1"});
  console.log("Login Successful");
}
else {
  res.render("thunderbolt",{Log:"Login", permission:"2"})
  console.log("login Unsuccessful");
}
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/addUser",function(req,res){
  if(req.isAuthenticated()){
    res.render("addUser",{Log:"Logout", permission:"1"});
    console.log("Login Successful");
  }
  else {
    res.render("login",{Log:"Login",permission:"2"})
    console.log("login Unsuccessful");
  }
})

// app.get("/secrets",function(req,res){
//   if(req.isAuthenticated()){
//     res.render("secrets");
//     console.log("Login Successful");
//   }
//   else {
//     res.redirect("/login");
//   }
// });

app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
  console.log("logout Successful");
})

app.get("/forgotPassword",function(req,res){
  res.render("forgotPassword")
})



app.post("/addUser",function(req,res){

  User.register({username:req.body.username},req.body.password, function(err,user){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req,res,function(){
        res.redirect("/");
      })
    }
  })
})

app.post("/login",function(req,res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user,function(err){
    if(err){
      console.log(err);
    }
    else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("/");
      });
    }
  })

})
app.post("/forgotPassword",function(req,res){
  const email=req.body.username;
  console.log(email);
  res.redirect("/");
})

app.listen(3000,function(){
  console.log("Server started on port 3000");
});
