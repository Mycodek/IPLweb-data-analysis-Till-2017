// library included
const {Client} = require('pg');
const ejsLint = require('ejs-lint');
const fs = require('fs');
const express = require('express');
var catme  = require('cat-me');
const queries = require('./queries.js');
var bodyParser = require('body-parser')

// intialization
const app = new express();
var Qrs = new queries();

// setup
app.set('view engine', 'ejs');
// var urlencodedParser = 
app.use(bodyParser.urlencoded({ extended: true }))
// var jsonParser = bodyParser.json()
// app.use(bodyParser.text({ type: 'text/html' }));

// client connection
let port = 8080;
const client = new Client({
    // connectionString : connection_String
    user: 'postgres',
    host: 'localhost',
    database: 'mydatabase',
    password: 'XXXXXX',
    port: 5432,
});
client.connect();

// routing
let searchedP = 'all';

app.get("/",async function(req,res){
    try{
        qmain = Qrs.sp_byName('V Kohli');
        console.log(searchedP);
        if (searchedP != 'all'){
            console.log("check");
            qmain = Qrs.sp_byName(searchedP);
        }
        const PlayerResult = await client.query(qmain);
        const tabresult = await client.query('SELECT * FROM team');
        res.render("index.ejs",{title:'players',pdata : PlayerResult.rows[0],resTable:tabresult.rows});
    }
    catch(err){
    }
});

app.get("/Players",async function(req,res){
    try{
        qmain = Qrs.sp_byName('V Kohli');
        console.log(searchedP);
        if (searchedP != 'all'){
            console.log("check");
            qmain = Qrs.sp_byName(searchedP);
        }
        const PlayerResult = await client.query(qmain);
        const tabresult = await client.query('SELECT * FROM team');
        res.render("index.ejs",{title:'players',pdata : PlayerResult.rows[0],resTable:tabresult.rows});
    }
    catch(err){
        console.log("In catch");
    }
});
app.post('/search-player',async function(req,res){
    // var post_data = req.body;
    console.log(req.body.name);
    searchedP = req.body.name;
    return res.redirect('/Players');
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
