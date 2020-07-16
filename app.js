// library included
const {Client} = require('pg');
const ejsLint = require('ejs-lint');
const fs = require('fs');
const express = require('express');
var catme  = require('cat-me');
const queries = require('./queries.js');
var bodyParser = require('body-parser')
// var alert = require('alert-node')

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
let port = 8800;
// const client = new Client({
//     // connectionString : connection_String
//     user: 'group_26',
//     host: '10.17.50.137',
//     database: 'group_26',
//     password: '232-820-678',
//     port: 5432,
// });
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
    property : 'Field Not Applied'
}
function formQuery(obj){
    obj.tabChange = false;
    if(IndexData_obj.season_flag && IndexData_obj.country_flag && IndexData_obj.team_flag){
        return Qrs.CST(IndexData_obj);
    }
    if(IndexData_obj.season_flag && IndexData_obj.country_flag){
        return Qrs.SC(IndexData_obj);
    }
    if(IndexData_obj.season_flag && IndexData_obj.team_flag){
        return Qrs.ST(IndexData_obj);
    }
    if(IndexData_obj.country_flag && IndexData_obj.team_flag){
        return Qrs.CT(IndexData_obj);
    }
    if(IndexData_obj.season_flag && IndexData_obj.pro_flag){
        obj.tabChange = true;
        if(IndexData_obj.property == 'Most_Six_Hitter') return Qrs.ss_sx(IndexData_obj.season_year);
        else if(IndexData_obj.property == 'Most_Four_Hitter') return Qrs.ss_fs(IndexData_obj.season_year);
        else if(IndexData_obj.property == 'Most_Wickets_Taker') return Qrs.ss_w(IndexData_obj.season_year);
    }
    if(IndexData_obj.team_flag){
        return Qrs.T(IndexData_obj);
    }
    if(IndexData_obj.country_flag){
        return Qrs.C(IndexData_obj);
    }
    if(IndexData_obj.season_flag){
        return Qrs.S(IndexData_obj);
    }
    return "SELECT * FROM Player";
}
// ////////////////////////////////////////////////    ROOT    ////////////////////////////////////////////////////////
app.get("/",async function(req,res){
    try{
        console.log("in/ :");
        var obj = {tabChange:false}
        const q_comp = formQuery(obj);
        // console.log(q_comp);
        const allPlayer = await client.query(q_comp);
        // console.log(allPlayer.rows);
        const allSeason = await client.query('SELECT Season_Year FROM match GROUP BY Season_Year ORDER BY Season_Year');
        const allTeam = await client.query('SELECT team_name FROM team');
        const allCountry = await client.query('SELECT country_name FROM player GROUP BY country_name ORDER BY country_name');
        const allp = await client.query('SELECT player_name FROM player;');
        // console.log(allPlayer.rows);
        res.render("index.ejs",{    
            allPlayer : allPlayer.rows,
            allSeason : allSeason.rows,
            allTeam   : allTeam.rows,
            allCountry: allCountry.rows,
            IndexData_obj : IndexData_obj,
            allp : allp.rows,
            tabChange : obj.tabChange
        });
    }
    catch(err){
        console.log("In catch");
        console.log(err);
    }
});
app.post('/search-multi-player',async function(req,res){
    console.log("in/search-multi-player :");
    if (req.body.country_name != "All Countries"){
        IndexData_obj.country_flag = true;
    }else{
        IndexData_obj.country_flag = false;
    }
    if (req.body.team_name != "All Teams"){
        IndexData_obj.team_flag = true;
    }else{
        IndexData_obj.team_flag = false;
    }
    if(req.body.season_year != "All Seasons"){
        IndexData_obj.season_flag = true;
    }else{
        IndexData_obj.season_flag = false;
    }
    if(req.body.property != "Field Not Applied") {
        IndexData_obj.pro_flag = true;
    }else{
        IndexData_obj.pro_flag = false;
    }
    IndexData_obj.country_name = req.body.country_name;
    IndexData_obj.team_name = req.body.team_name;
    IndexData_obj.season_year = req.body.season_year;
    IndexData_obj.property = req.body.property;

    // console.log(IndexData_obj);
    // console.log("msg in multi-player");
    return res.redirect('/');
});

// ////////////////////////////////////////////////    Player data    ////////////////////////////////////////////////////////
// let searchedP = 'all';
app.get("/Player/:p_name",async function(req,res){
    try{
        // console.log("hey u'r here in pli."+ req.params.p_name + "!!!");
        const searchedP = req.params.p_name;
        let qq = "SELECT player_name FROM player WHERE player.player_name = "+"'"+searchedP+"';";
        const tmpQ = await client.query(qq);
        if (tmpQ.rowCount == 0) {
            console.log("check141");
            res.send("<h1>User Not Found, Please go back!</h1>");
            // Alert('User Not Found, Please try again');
        }
        else{
            console.log("In/Player/playerInfo");
            console.log(searchedP);
            qmain = Qrs.sp_byName(searchedP);
            const PlayerResult = await client.query(qmain);
            // batting
            qStats = Qrs.p_stats(searchedP);
            q_stats = qStats.split(/[;]/);
            q_list = [];
            for (let i = 0; i < q_stats.length; i++) {
                element = q_stats[i];
                const state_arr = await client.query(q_stats[i]);
                q_list.push(state_arr);
            }
            // bowling
            bStats = Qrs.p_Ball_stats(searchedP);
            b_stats = bStats.split(/[;]/);
            b_list = [];
            for (let i = 0; i < b_stats.length; i++) {
                element = b_stats[i];
                const state_arr = await client.query(b_stats[i]);
                b_list.push(state_arr);
                // console.log(i);
                // console.log(state_arr);
            }

            const PlayerStats = q_list[28];
            const PlayerBallStats = b_list[49];
            const allp = await client.query('SELECT player_name FROM player;');
            res.render("singlePlayer.ejs",{
                pdata : PlayerResult.rows[0],
                p_stats : PlayerStats.rows,
                PlayerBallStats :PlayerBallStats.rows, 
                allp:allp.rows
            });
        }
    }
    catch(err){
        console.log(err);
        console.log("In catch");
    }
});
// -------------------------------------------------------------------------------------------------------------
// ////////////////////////////////////////////////    Team Data    ////////////////////////////////////////////////////////
let seasonYr = 'All Season';
app.get("/Teams",async function(_err,res){
    // res.send(fs.readFile("MovieClub.html"));
    try{
        console.log("In/Teams:");
        let tabresult;
        console.log(seasonYr);
        if(seasonYr && seasonYr != 'All Season'){
            tabresult = await client.query(Qrs.seasonTeams(Number(seasonYr)));
        }else{
            seasonYr = 'All Season';
            tabresult = await client.query('SELECT * FROM team');
        }
        const allSeason = await client.query('SELECT Season_Year FROM match GROUP BY Season_Year ORDER BY Season_Year');
        const allp = await client.query('SELECT player_name FROM player;');
        // console.log(tabresult.rows);
        res.render("teamIndex.ejs",{
            resTable : tabresult.rows,
            allSeason : allSeason.rows,
            seasonYr:seasonYr,
            allp : allp.rows
        });
    }
    catch(err){
        console.log("In catch");
        console.log(err);
    }
});

app.post('/search-season-wise',async function(req,res){
    // var post_data = req.body;
    // console.log(req.body.name);
    seasonYr = req.body.name;
    console.log(seasonYr);
    // qmain = Qrs.sp_byName(searchedP);
    return res.redirect('/Teams');
});

app.get("/TeamData/:tmName",async function(req,res){
    // res.send(fs.readFile("MovieClub.html"));
    try{
        console.log("In/TeamData/teamName");
        console.log(req.params.tmName);
        const tm = req.params.tmName;
        const qry = Qrs.TeamStats(tm);
        const Player_qry = Qrs.All_teamP(tm);

        // console.log(Player_qry);
        const tabresult = await client.query(qry);
        const player_res = await client.query(Player_qry);
        const allSeason = await client.query('SELECT Season_Year FROM match GROUP BY Season_Year ORDER BY Season_Year');
        const allp = await client.query('SELECT player_name FROM player;');
        
        res.render("singleTeam.ejs",{
            teamName : tm,
            statsTable  : tabresult.rows,
            player_res : player_res.rows,
            allSeason : allSeason.rows,
            allp : allp.rows
        });
    }
    catch(err){
        console.log(err);
        console.log("In catch");
    }
});
// ////////////////////////////////////////////////    Venue    ////////////////////////////////////////////////////////
app.get("/Venue",async function(req,res){
    try{
        console.log("In/Venue");
        const q_comp = Qrs.Vview("no arg");
        q_stats = q_comp.split(/[;]/);
        q_list = [];
        for (let i = 0; i < q_stats.length; i++) {
            element = q_stats[i];
            const state_arr = await client.query(q_stats[i]);
            q_list.push(state_arr);
        }
        // console.log(q_comp);
        const allVenue = q_list[2];
        // console.log(allVenue);
        const allp = await client.query('SELECT player_name FROM player;');
        res.render("Venue.ejs",{
            allVenue : allVenue.rows,
            allp : allp.rows
        });
    }
    catch(err){
        console.log("In catch of venue");
        console.log(err);
    }
});

/////////////////////////////////////////////////   Match data /////////////////////////////////////////////////////
let MatchIndexData_obj = {
    venue_flag:false,
    team_flag:false,
    season_flag:false,
    pro_flag : false,

    venue_name:'All Venue',
    team_name:'All Teams',
    season_year:'All Seasons',
    property : 'Field Not Applied'
}
function formMatchQuery(){
    if(MatchIndexData_obj.season_flag && MatchIndexData_obj.venue_flag && MatchIndexData_obj.team_flag){
        return Qrs.mBy_YTV(MatchIndexData_obj);
    }
    if(MatchIndexData_obj.season_flag && MatchIndexData_obj.venue_flag){
        return Qrs.mBy_YrVn(MatchIndexData_obj);
    }
    if(MatchIndexData_obj.season_flag && MatchIndexData_obj.team_flag){
        return Qrs.mBy_YrTm(MatchIndexData_obj);
    }
    if(MatchIndexData_obj.venue_flag && MatchIndexData_obj.team_flag){
        return Qrs.mBy_TmVn(MatchIndexData_obj);
    }
    if(MatchIndexData_obj.team_flag){
        return Qrs.mBy_Tm(MatchIndexData_obj);
    }
    if(MatchIndexData_obj.venue_flag){
        return Qrs.mBy_Vn(MatchIndexData_obj);
    }
    if(MatchIndexData_obj.season_flag){
        return Qrs.mBy_Yr(MatchIndexData_obj);
    }
    return "select match_id,season_year , Team1 ,Team2,Venue_Name , match_winner, Win_Type ,ManOfMach ,Win_Margin FROM match";
}
app.get("/Matches",async function(req,res){
    try{
        console.log("In/Matches :");
        // console.log(q_comp);
        qur = formMatchQuery();
        console.log(qur);
        const allMatches = await client.query(qur);
        // console.log(allMatches.rows);
        const allSeason = await client.query('SELECT Season_Year FROM match GROUP BY Season_Year ORDER BY Season_Year');
        const allTeam = await client.query('SELECT team_name FROM team');
        const AllVenue = await client.query('SELECT venue_name FROM match GROUP BY venue_name ORDER BY venue_name');
        const allp = await client.query('SELECT player_name FROM player;');
        // console.log(allMatches.rows);
        res.render("matchIndex.ejs",{    
            allMatches : allMatches.rows,
            allSeason : allSeason.rows,
            allTeam   : allTeam.rows,
            AllVenue: AllVenue.rows,
            MatchIndexData_obj : MatchIndexData_obj,
            allp : allp.rows
        });
    }
    catch(err){
        console.log("In catch");
        console.log(err);
    }
});
// pg_dump -d mydatabase -h localhost -U postgres > mydatabase.sql
app.post('/search-match-list',async function(req,res){
    console.log("in/search-multi-player :");
    if (req.body.venue_name != "All Venue"){
        MatchIndexData_obj.venue_flag = true;
    }else{
        MatchIndexData_obj.venue_flag = false;
    }
    if (req.body.team_name != "All Teams"){
        MatchIndexData_obj.team_flag = true;
    }else{
        MatchIndexData_obj.team_flag = false;
    }
    if(req.body.season_year != "All Seasons"){
        MatchIndexData_obj.season_flag = true;
    }else{
        MatchIndexData_obj.season_flag = false;
    }
    // if(req.body.property != "Field Not Applied") {
    //     MatchIndexData_obj.pro_flag = true;
    // }else{
    //     MatchIndexData_obj.pro_flag = false;
    // }
    MatchIndexData_obj.venue_name = req.body.venue_name;
    MatchIndexData_obj.team_name = req.body.team_name;
    MatchIndexData_obj.season_year = req.body.season_year;
    // MatchIndexData_obj.property = req.body.property;

    // console.log(MatchIndexData_obj);
    // console.log("msg in multi-player");
    return res.redirect('/Matches');
});

app.get("/Match/:mid",async function(req,res){
    try{
        // console.log("hey u'r here in pli."+ req.params.p_name + "!!!");
        const mid = Number(req.params.mid);
        const tms = 'select * from match where match_id='+"'"+mid+"'"+';';
        console.log("check before");
        // console.log("tab1 : ",Qrs.M_batRes({mid:mid,ino:1}));
        // console.log("tab1 : ",Qrs.M_batRes({mid:mid,ino:2}));
        const Mdata =(await client.query(tms)).rows[0];
        console.log(Mdata);
        const bdata = { name1:null,tab1:null,target:0,out1:0,extra1:0,bowlerIn1:null,
                        name2:null,tab2:null,cover:0,out2:0,extra2:0,bowlerIn2:null,city:null};

        console.log("batting : ",Qrs.M_batRes({mid:mid,ino:1}));
        console.log("bowling : ",Qrs.M_bowlRes({mid:mid,ino:1}));
        bdata.tab1 = (await client.query(Qrs.M_batRes({mid:mid,ino:1}))).rows;
        bdata.tab2 = (await client.query(Qrs.M_batRes({mid:mid,ino:2}))).rows;

        // console.log("Btab1 : ",Qrs.M_bowlRes({mid:mid,ino:1}));
        // console.log("tab1 : ",Qrs.M_bowlRes({mid:mid,ino:2}));
        bdata.bowlerIn1 = (await client.query(Qrs.M_bowlRes({mid:mid,ino:1}))).rows;
        bdata.bowlerIn2 = (await client.query(Qrs.M_bowlRes({mid:mid,ino:2}))).rows;

        bdata.city = (await client.query('select city_name from ground where venue_name ='+"'"+Mdata.venue_name+"'"+' ;')).rows[0].city_name;
        for (let i = 0; i < bdata.tab1.length; i++) {
            bdata.target = bdata.target + Number(bdata.tab1[i].run) + Number(bdata.tab1[i].extra);
            bdata.out1 = bdata.out1 + Number(bdata.tab1[i].outcount);
            bdata.extra1 = bdata.extra1 + Number(bdata.tab1[i].extra);
        }
        for (let i = 0; i < bdata.tab2.length; i++) {
            bdata.cover = bdata.cover + Number(bdata.tab2[i].run) + Number(bdata.tab2[i].extra);
            bdata.out2 = bdata.out2 + Number(bdata.tab2[i].outcount);
            bdata.extra2 = bdata.extra2 + Number(bdata.tab2[i].extra);
        }
        console.log(bdata.city);
        if(Mdata.toss_name == 'field'){
            bdata.name2 = Mdata.toss_winner;
            if(Mdata.toss_winner == Mdata.team1){
                bdata.name1 = Mdata.team2;
            }
            if(Mdata.toss_winner == Mdata.team2){
                bdata.name1 = Mdata.team1;
            }
        }else{
            bdata.name1 = Mdata.toss_winner;
            if(Mdata.toss_winner == Mdata.team1){
                bdata.name2 = Mdata.team2;
            }
            if(Mdata.toss_winner == Mdata.team2){
                bdata.name2 = Mdata.team1;
            }
        }
        // console.log(bdata);

        let q1 = Qrs.M_details({mid:mid,tm:Mdata.team1});
        let q2 = Qrs.M_details({mid:mid,tm:Mdata.team2});
        console.log(q1);
        console.log(q2);
        let q1l = await client.query(q1);
        let q2l = await client.query(q2);
        
        console.log("In/Match/",mid);
        const allp = await client.query('SELECT player_name FROM player;');

        res.render("singleMatch.ejs",{
            Mdata : Mdata,
            tm1 : q1l.rows,
            tm2 : q2l.rows,
            bdata : bdata,
            allp:allp.rows
        });
    }
    catch(err){
        console.log(err);
        console.log("In catch of match find");
    }
});

app.get("*",(req,res)=>{
    res.send("hey u'r lost");
});

app.listen(port,function(){
    // catme();
    // console.log(catme());
    console.log("Server started listining at port :"+port);
});
