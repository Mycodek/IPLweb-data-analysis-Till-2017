var http = require('http');
const express = require('express');
var fs = require('fs');
var catme  = require('cat-me');


const app = new express();
let port = 8080;
// const sql = require('mssql');

app.get("/",function(req,res){
    // console.log(catme());
    // res.send(fs.readFile("MovieClub.html"));
    // console.log(req);
    // res.send("<h1>Kailash kumawat</h1>");
    res.render("homepage.ejs",{title : "homepage2",counter:5});
});

app.get("/about",(req,res)=>{
    res.send("hey u'r here in about");
});

app.get("/contact/:anything",(req,res)=>{
    res.send("hey u'r here in contact."+ req.params.anything + "!!!");
});

app.get("*",(req,res)=>{
    res.send("hey u'r lost");
});

app.listen(port,function(){
    // catme();
    console.log(catme());
    console.log("Server started listining at port :"+port);
});