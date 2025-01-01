const express = require("express");
const app = express();


app.post("/user/signup",function(req,res){
    res.json({
        message:"hello world"
        })
    })
    
app.post("/user/signin",function(req,res){
        res.json({
            message:"hello world"
            })
        })