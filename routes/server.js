const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");


const sessionOptions = {
    secret : "mysupersecretestring",
    resave : false,
    saveUninitialized : true
}


app.use(session(sessionOptions));


app.get("/register" , (req,res) =>{
    let {name = "Unkown"} = req.query;
    req.session.name = name;
    res.send(`Hi , ${name}`);
})

app.get("/hello" , (req,res) =>{
    res.send(`Hello ${req.session.name}`)
})

// app.get("/getcookies", (req,res) => {
//     res.cookie("Greet" , "Hello")
//     res.send("Sent some cookies")

// })



app.listen(3000 , () => {
    console.log("App is listening to port 3000");
})