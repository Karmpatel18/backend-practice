const express = require("express");
const app = express;


app.get("products/preview",function(req,res){
    res.json({
        message:"all products are listed"
    })
})