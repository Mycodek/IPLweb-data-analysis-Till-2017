const {Client} = require('pg');
const ejsLint = require('ejs-lint');
const fs = require('fs');
const express = require('express');
var catme  = require('cat-me');
// var index = require('./routes/index');
const queries = require('./queries.js');

var person1 = new queries();
console.log(person1.sp_byName("SC Ganguly"));

const app = new express();
app.set('view engine', 'ejs');
let port = 8080;
const client = new Client({
    // connectionString : connection_String
    user: 'postgres',
    host: 'localhost',
    database: 'mydatabase',
    password: 'XXXXXXX',
    port: 5432,
});
client.connect();

app.get("/",async function(_err,result){
    try{
        const tabresult = await client.query('SELECT * FROM team');
        result.render("index.ejs",{title : "Home",resTable:tabresult.rows});
    }
    catch(err){
    }
});

app.get("/Players",async function(_err,result){
    try{
        const tabresult = await client.query('SELECT * FROM team');
        result.render("index.ejs",{title : "Players",resTable:tabresult.rows});
    }
    catch(err){
        console.log("In catch");
    }
});

app.get("/Teams",async function(_err,result){
    // res.send(fs.readFile("MovieClub.html"));
    try{
        const tabresult = await client.query('SELECT * FROM team');
        result.render("index.ejs",{title : "Teams",resTable:tabresult.rows});
    }
    catch(err){
        console.log("In catch");
    }
});

app.listen(port,function(){
    // catme();
    console.log(catme());
    console.log("Server started listining at port :"+port);
});
