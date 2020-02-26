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
    password: 'psqlpsql',
    port: 5432,
});
client.connect();

// routing
let IndexData_obj = {
    country_flag:false,
    team_flag:false,
    season_flag:false,
    pro_flag : false,

    country_name:'All Countries',
    team_name:'All Teams',
    season_year:'All Seasons',
    property : 'Six/Four/Wickets'
}

function formQuery(){
    if(IndexData_obj.season_flag && IndexData_obj.pro_flag){
        if(IndexData_obj.property == 'Most_Six_Hitter') return Qrs.ss_sx(IndexData_obj.season_year);
        else if(IndexData_obj.property == 'Most_Four_Hitter') return Qrs.ss_fs(IndexData_obj.season_year);
        else if(IndexData_obj.property == 'Most_Wickets_Taker') return Qrs.ss_w(IndexData_obj.season_year);
    }
    return "SELECT * FROM Player";
}

app.get("/",async function(req,res){
    try{
        const q_comp = formQuery();
        console.log(q_comp);
        const allPlayer = await client.query(q_comp);
        // console.log(allPlayer.rows);
        const allSeason = await client.query('SELECT Season_Year FROM match GROUP BY Season_Year ORDER BY Season_Year');
        const allTeam = await client.query('SELECT team_name FROM team');
        const allCountry = await client.query('SELECT country_name FROM player GROUP BY country_name ORDER BY country_name');
        res.render("index.ejs",{
            allPlayer : allPlayer.rows,
            allSeason : allSeason.rows,
            allTeam   : allTeam.rows,
            allCountry: allCountry.rows
        });
    }
    catch(err){
        console.log("In catch");
    }
});
app.post('/search-multi-player',async function(req,res){
    if (req.body.country_name != "All Countries"){
        IndexData_obj.country_name = req.body.country_name;
        IndexData_obj.country_flag = true;
    }
    if (req.body.team_name != "All Teams"){
        IndexData_obj.team_name = req.body.team_name;
        IndexData_obj.team_flag = true;
    }
    if(req.body.season_year != "All Seasons"){
        IndexData_obj.season_year = req.body.season_year;
        IndexData_obj.season_flag = true;
    }
    if(req.body.property != "Six/Four/Wickets") {
        IndexData_obj.property = req.body.property;
        IndexData_obj.pro_flag = true;
    }
    console.log(IndexData_obj);
    console.log("msg in multi-player");
    return res.redirect('/');
});

let searchedP = 'all';
app.get("/Player",async function(req,res){
    try{
        qmain = Qrs.sp_byName('V Kohli');
        console.log(searchedP);
        if (searchedP != 'all'){
            console.log("check");
            qmain = Qrs.sp_byName(searchedP);
        }
        
        const PlayerResult = await client.query(qmain);
        const allPlayer = await client.query('SELECT * FROM player');
        const allSeason = await client.query('SELECT Season_Year FROM match GROUP BY Season_Year ORDER BY Season_Year');
        const allTeam = await client.query('SELECT team_name FROM team');
        const allCountry = await client.query('SELECT country_name FROM player GROUP BY country_name ORDER BY country_name');
        res.render("singlePlayer.ejs",{
            title:'Players',
            pdata : PlayerResult.rows[0],
            resTable:allPlayer.rows,
            allSeason : allSeason.rows,
            allTeam : allTeam.rows,
            allCountry : allCountry.rows
        });
    }
    catch(err){
        console.log("In catch");
    }
});

app.post('/search-player',async function(req,res){
    // var post_data = req.body;
    console.log(req.body.name);
    searchedP = req.body.name;
    console.log("msg in single player");
    return res.redirect('/Player');
});


app.get("/Teams",async function(_err,res){
    // res.send(fs.readFile("MovieClub.html"));
    try{
        console.log("check89");
        const tabresult = await client.query('SELECT * FROM team');
        console.log("check91");
        const allSeason = await client.query('SELECT Season_Year FROM match GROUP BY Season_Year ORDER BY Season_Year');
        console.log("check93");
        res.render("teamIndex.ejs",{
            title:'Teams',
            resTable:tabresult.rows,
            allSeason : allSeason.rows
        });
    }
    catch(err){
        console.log("In catch");
    }
});
app.get("*",(req,res)=>{
    res.send("hey u'r lost");
});

app.listen(port,function(){
    // catme();
    console.log(catme());
    console.log("Server started listining at port :"+port);
});
