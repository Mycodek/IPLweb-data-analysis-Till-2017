let teamDataSearch =function(arg1,arg2){
    return 'Select * From Team WHERE Team.'+arg2+'='+"'"+arg1+"';";
}
let playerDataSearch =function(arg1,arg2){
    return 'Select * From player WHERE player.'+arg2+'='+"'"+arg1+"';";
}
////////////////////////////////////////
let SeasonStats_Sixes = function(arg1,arg2){
    return 'SELECT a1.a2 AS countx,player.player_name FROM (SELECT striker,count(striker) AS a2 FROM ball_by_ball,match WHERE runs_scored =' +"'"+ arg1+"'" + 'AND match.season_year = ' +"'"+ arg2 +"'" + ' AND match.match_id = ball_by_ball.match_id  GROUP BY striker order by count(striker) desc)AS a1 , player  WHERE player.player_id = a1.striker GROUP BY a1.a2 , player.player_name order by a1.a2 desc;' ;
}

let SeasonStats_Fours = function(arg1,arg2){
    return 'SELECT a1.a2 AS countx,player.player_name FROM (SELECT striker,count(striker) AS a2 FROM ball_by_ball,match WHERE runs_scored =' + "'" +arg1+"'" + 'AND match.season_year = ' +"'"+ arg2 +"'"+ ' AND match.match_id = ball_by_ball.match_id  GROUP BY striker order by count(striker) desc)AS a1 , player  WHERE player.player_id = a1.striker GROUP BY a1.a2 , player.player_name order by a1.a2 desc;' ;
}
let SeasonStats_conceededFours = function(arg1,arg2)
{
    return 'SELECT a1.a2 AS countx,player.player_name FROM (SELECT bowler,count(bowler) AS a2 ' + 
   ' FROM ball_by_ball,match WHERE runs_scored = '+"'" + arg1 +"'"+' AND match.season_year = ' + "'"+ arg2 +"' " +
   ' AND match.match_id = ball_by_ball.match_id GROUP BY bowler order by count(bowler) desc)AS a1 , player ' +
   ' WHERE player.player_id = a1.bowler GROUP BY a1.a2 , player.player_name order by a1.a2 desc ';
}

let SeasonStats_conceededSixes = function(arg1,arg2)
{
    return 'SELECT a1.a2 AS countx,player.player_name FROM (SELECT bowler,count(bowler) AS a2 ' + 
   ' FROM ball_by_ball,match WHERE runs_scored = ' +"'" + arg1 +"'" +' AND match.season_year = ' + "'" +arg2 +"' "+
   ' AND match.match_id = ball_by_ball.match_id GROUP BY bowler order by count(bowler) desc)AS a1 , player ' +
   ' WHERE player.player_id = a1.bowler GROUP BY a1.a2 , player.player_name order by a1.a2 desc;';
}

let SeasonStats_Wickets = function(arg1)
{
    return  'SELECT a1.a2 AS countx,player.player_name '+
            'FROM player ,( SELECT bowler,count(bowler) AS a2 ' +
                            'FROM ball_by_ball,match '+
                            'WHERE bowler_wicket = 1 AND match.season_year = ' + "'" + arg1 +"'" + 'AND match.match_id = ball_by_ball.match_id ' +
                            'GROUP BY bowler '+
                            'ORDER BY count(bowler) DESC )AS a1 ' +
            'WHERE player.player_id = a1.bowler '+
            'GROUP BY a1.a2 , player.player_name '+
            'ORDER BY a1.a2 DESC; ';
}
////////////////////////////////////////


let TopScorers = function(arg1)
{
return  'CREATE view runs_in_ball AS ' +
'SELECT runs_scored ,striker,season_year FROM ball_by_ball,match WHERE match.match_id= ball_by_ball.match_id' + "; " +
'SELECT a1.sum,player_name FROM ' +
'(SELECT sum(runs_scored),striker FROM runs_in_ball WHERE  season_year = '+"'" + arg1 + "' " + 
'GROUP BY striker order by sum(runs_scored) desc) AS a1 , player WHERE player.Player_Id = a1.striker ' +
'GROUP BY a1.striker,a1.sum,player_name order by a1.sum desc' + "; " +
'drop view runs_in_ball;';
}

let player = function(arg1)
{
    return  'CREATE view runs_in_ball AS ' +
            'SELECT runs_scored ,striker,season_year,match.match_id '+
            'FROM ball_by_ball,match '+
            'WHERE match.match_id= ball_by_ball.match_id; '+
    
    'CREATE view v1 AS ' +
    'SELECT sum(runs_scored) AS runs_scored,player_name,striker,season_year '+
    'FROM runs_in_ball,player ' +
    'WHERE striker=player.player_id AND player.player_name =' +"'" +  arg1 + "' " +
    'GROUP BY striker,player_name,season_year order by season_year desc' + "; " +

    'CREATE view v2 AS ' +
    'SELECT count(player_match.match_id),match.season_year '+
    'FROM player_match,match,player ' +
    'WHERE player_match.match_id = match.match_id AND player.player_name = ' + "'" + arg1 + "'" +' AND player.player_id=player_match.player_id '+
    'GROUP BY match.season_year,player.player_id' +  ";" +
    
    'CREATE table v4 AS ' +
    'SELECT coalesce(count(a1.sum),0),a1.season_year ' +
    'FROM (SELECT sum(runs_scored),striker,season_year FROM runs_in_ball,player WHERE   striker=player.player_id AND player_name = ' + "'" + arg1 + "' "+
    'GROUP BY striker,match_id,season_year order by sum(runs_scored) desc) AS a1 WHERE a1.sum >= 100 GROUP BY a1.season_year' + ";" +
    
    'INSERT into v4 values(0,2008)' + ";" +
    'INSERT into v4 values(0,2009)' + ";" +
    'INSERT into v4 values(0,2010)' + ";" +
    'INSERT into v4 values(0,2011)' + ";" +
    'INSERT into v4 values(0,2012)' + ";" +
    'INSERT into v4 values(0,2013)' + ";" +
    'INSERT into v4 values(0,2014)' + ";" +
    'INSERT into v4 values(0,2015)' + ";" +
    'INSERT into v4 values(0,2016)' + ";" +
    'INSERT into v4 values(0,2017)' + ";" +
    
    'CREATE view v40 AS SELECT max(coalesce),season_year FROM v4 GROUP BY season_year' + "; " +
    
    'CREATE table v3 AS ' +
    'SELECT coalesce(count(a1.sum),0),a1.season_year FROM ' +
    '(SELECT sum(runs_scored),striker,season_year FROM runs_in_ball,player WHERE   striker=player.player_id AND player_name = ' + "'" + arg1 + "' " +
    'GROUP BY striker,match_id,season_year order by sum(runs_scored) desc) AS a1 WHERE a1.sum >= 50 AND a1.sum <100 GROUP BY a1.season_year' + "; " +
    
    'INSERT into v3 values(0,2008)' + ";" +
    'INSERT into v3 values(0,2009)' + ";" +
    'INSERT into v3 values(0,2010)' + ";" +
    'INSERT into v3 values(0,2011)' + ";" +
    'INSERT into v3 values(0,2012)' + ";" +
    'INSERT into v3 values(0,2013)' + ";" +
    'INSERT into v3 values(0,2014)' + ";" +
    'INSERT into v3 values(0,2015)' + ";" +
    'INSERT into v3 values(0,2016)' + ";" +
    'INSERT into v3 values(0,2017)' + ";" +
    
    'CREATE view v30 AS '+
    'SELECT max(coalesce),season_year FROM v3 GROUP BY season_year' + "; " +
    
    'CREATE view v5 AS ' +
    'SELECT max(a1.sum),a1.season_year FROM '+
    '(SELECT sum(runs_scored),striker,season_year FROM runs_in_ball,player WHERE   striker=player.player_id AND player_name = '+ "'" + arg1 + "' " +
    'GROUP BY striker,match_id,season_year order by sum(runs_scored) desc) AS a1 GROUP BY a1.season_year' + "; " +
    
    'SELECT v1.runs_scored,v5.max AS HS, v2.count AS matches , v30.max AS fifties , v40.max ' +
    'AS centuries,v1.season_year AS season FROM v1,v2,v3,v4,v5,v30,v40 ' +
    'WHERE v1.season_year = v2.season_year AND v30.season_year = v2.season_year AND v30.season_year = v40.season_year AND v2.season_year = v3.season_year  AND v3.season_year = v4.season_year AND v4.season_year = v5.season_year ' +
    'GROUP BY v1.runs_scored , HS , matches , fifties,centuries,season order by season desc' + "; " +
    
    'drop view v1' + ";" +
    'drop view v2' + ";" +
    
    'drop view v5' + ";" +
    'drop view v30' + ";" +
    'drop view v40' + ";" +
    'drop view runs_in_ball' + ";" +
    'drop table v3' + ";" +
    'drop table v4' + ";" ;
}

let TPlayers = function(arg1)
{
    return 'SELECT player.player_name,count(player_match.player_id) FROM player_match,player ' + 
     'where player.player_id = player_match.player_id AND '+
     'player_match.player_team = ' +"'" + arg1 + "'"+' group by player.player_name, ' +
     'player_match.player_id order by count(player_match.player_id) DESC' + "; ";
}

let TPlStats = function(arg1)
{
    return 'SELECT a1.season_year,a1.total_matches,a2.winning_matches FROM ' + 
    '(SELECT match.season_year as season_year, count(player_match.player_team)/11 as total_matches ' +
    'FROM player_match,match ' + 
    'where match.match_id = player_match.match_id AND player_match.player_team = ' + "'" + arg1 + "' " +  
    'group by match.season_year order by match.season_year) as a1, ' +
    
    '(SELECT match.season_year as season_year, count(player_match.player_team)/11 as winning_matches ' +
    'FROM player_match,match ' + 
    'where match.match_id = player_match.match_id AND player_match.player_team = ' + "'" + arg1 + "' " +
    ' AND match.match_winner =  ' + "'" + arg1 + "' " + 
    'group by match.season_year order by match.season_year) as a2 ' +
    'where  a1.season_year = a2.season_year; ' ;
}

let venueD = function(){
    return 'create view total_venue_matches as '+
    'SELECT match.venue_name as venue_name, ground.city_name as city_name,ground.country_name as country_name,count(match.venue_name) as total_venue_matches ' +
    'from ground,match '+
    'where ground.venue_name = match.venue_name '+
    'group by match.venue_name,ground.city_name,ground.country_name; '+
    
    'create view winning_firstinnings_matches as '+
    'select match.venue_name as venue_name, ground.city_name as city_name,ground.country_name as country_name,count(match.venue_name) as winning_firstinnings_matches '+
    'from ground,match '+
    'where ground.venue_name = match.venue_name AND match.win_type = '+"'"+'wickets'+"' "+
    'group by match.venue_name,ground.city_name,ground.country_name; '+
    
    'select total_venue_matches.venue_name, total_venue_matches.city_name, total_venue_matches.country_name, total_venue_matches.total_venue_matches, winning_firstinnings_matches.winning_firstinnings_matches, (100* winning_firstinnings_matches.winning_firstinnings_matches/total_venue_matches.total_venue_matches)  as perc_battingfirst '+ 
    'from total_venue_matches, winning_firstinnings_matches '+
    'where total_venue_matches.venue_name  = winning_firstinnings_matches.venue_name '+
    'order by total_venue_matches.venue_name; '+
    
    'drop view total_venue_matches; ' +
    'drop view winning_firstinnings_matches; ';
}

let SelCon = function(arg1)
{
    return 'select distinct player.player_id , player.player_name, player.dob , player.batting_hand, player.bowling_skill , player.country_name from player ' +
 'where country_name = ' + "'" + arg1 + "'";
}

let SelTeam = function(arg1)
{
   return 'select  distinct player.player_id , player.player_name, player.dob , player.batting_hand, player.bowling_skill , player.country_name ' +
   'from player,player_match where player.player_id = player_match.Player_Id and player_match.player_team= ' + "'" + arg1 + "';";
}

let SelSeason = function(arg1)
{
    return  'select distinct player.player_id , player.player_name, player.dob , player.batting_hand, player.bowling_skill , player.country_name ' +
    'from player_match,player,match where match.match_id = player_match.match_id and player_match.player_id = player.player_id ' +
    'and match.season_year = ' + "'" + arg1 +"';";
}

let ConTeam = function(arg1,arg2)
{
    return 'select distinct player.player_id , player.player_name, player.dob , player.batting_hand, player.bowling_skill , player.country_name from player ' +
   ' where country_name = ' + "'" + arg1 + "' "  + 'intersect ' +
   'select  distinct player.player_id , player.player_name, player.dob , player.batting_hand, player.bowling_skill , player.country_name ' +
    'from player,player_match where player.player_id = player_match.Player_Id and player_match.player_team= ' + "'" + arg2 +"';";
}

let TeamSes = function(arg1,arg2)
{
    return 'select  distinct player.player_id , player.player_name, player.dob , player.batting_hand, player.bowling_skill , player.country_name ' +
 'from player,player_match where player.player_id = player_match.Player_Id and player_match.player_team= ' + "'"+ arg1 +"' " +' intersect ' +
 'select distinct player.player_id , player.player_name, player.dob , player.batting_hand, player.bowling_skill , player.country_name ' +
'from player_match,player,match where match.match_id = player_match.match_id and player_match.player_id = player.player_id ' +
'and match.season_year = ' + "'"+ arg2 +"';";
}

let ConSes = function(arg1,arg2)
{
    return 'select distinct player.player_id , player.player_name, player.dob , player.batting_hand, player.bowling_skill , player.country_name from player ' +
    'where country_name = ' + "'" + arg1 +"' "+
   'intersect ' +
    'select distinct player.player_id , player.player_name, player.dob , player.batting_hand, player.bowling_skill , player.country_name ' +
   'from player_match,player,match where match.match_id = player_match.match_id and player_match.player_id = player.player_id ' +
   'and match.season_year = ' + "'" + arg2 + "'" + '; ';
}

let triple = function(arg1,arg2,arg3)
{
    return 'select distinct player.player_id , player.player_name, player.dob , player.batting_hand, player.bowling_skill , player.country_name from player ' +
    'where country_name = ' + "'" + arg1 +"' " +
   'intersect ' +
    'select distinct player.player_id , player.player_name, player.dob , player.batting_hand, player.bowling_skill , player.country_name ' + 
   'from player_match,player,match where match.match_id = player_match.match_id and player_match.player_id = player.player_id ' +
   'and match.season_year = ' + "'" + arg2 + "' "+
   'intersect ' + 
    'select  distinct player.player_id , player.player_name, player.dob , player.batting_hand, player.bowling_skill , player.country_name ' +
    'from player,player_match where player.player_id = player_match.Player_Id and player_match.player_team= ' + "'" + arg3 +"';";  
}

let Bowlerstats = function(arg1)
{
    return 'create TABLE v2 as select match.season_year, count(ball_by_ball.bowler) from match,ball_by_ball,player ' +
     'WHERE ball_by_ball.bowler_wicket = '+ "'1'" + 'AND player.player_name = ' + "'" + arg1 + "'" + 
     ' AND ball_by_ball.bowler = player.player_id AND match.match_id = ball_by_ball.match_id group by match.season_year,ball_by_ball.bowler; ' +
      'INSERT into v2 values(2008,0); INSERT into v2 values(2009,0); INSERT into v2 values(2010,0); INSERT into v2 values(2011,0);INSERT into v2 values(2012,0);INSERT into v2 values(2013,0);INSERT into v2 values(2014,0);INSERT into v2 values(2015,0); INSERT into v2 values(2016,0); INSERT into v2 values(2017,0); '
      + 'CREATE view wickets AS SELECT season_year,max(COUNT) as count FROM v2 GROUP BY season_year; ' + 
    'create view total_matches as select match.season_year as season_year, count(player_match.player_id) as COUNT from match, player_match,player where  player.player_id = player_match.player_id AND player_match.match_id = match.match_id AND player.player_name = ' +
    "'" + arg1 + "'" + ' group by match.season_year,player_match.player_id;' + 
    ' create table v3 AS select match.season_year as season_year, count(ball_by_ball.bowler) as COUNT from match, ball_by_ball,player where  player.player_id = ball_by_ball.bowler AND ball_by_ball.match_id = match.match_id AND player.player_name = ' + 
    "'" + arg1 + "'" + ' group by match.season_year,ball_by_ball.bowler ;' +
    'INSERT into v3 values(2008,0); INSERT into v3 values(2009,0); INSERT into v3 values(2010,0); INSERT into v3 values(2011,0);INSERT into v3 values(2012,0);INSERT into v3 values(2013,0);INSERT into v3 values(2014,0);INSERT into v3 values(2015,0); INSERT into v3 values(2016,0); INSERT into v3 values(2017,0); ' +
    'CREATE view totalballs AS SELECT season_year,max(COUNT) as count FROM v3 GROUP BY season_year; ' + 
    'create TABLE v4 as select match.season_year, count(ball_by_ball.bowler) from match,ball_by_ball,player ' + 
    'WHERE ball_by_ball.extra_type = '+ "'wides'" +'AND player.player_name = ' +
    "'" + arg1 + "'" + ' AND ball_by_ball.bowler = player.player_id AND match.match_id = ball_by_ball.match_id ' +
    'group by match.season_year,ball_by_ball.bowler ; INSERT into v4 values(2008,0); INSERT into v4 values(2009,0); INSERT into v4 values(2010,0); INSERT into v4 values(2011,0);INSERT into v4 values(2012,0);INSERT into v4 values(2013,0);INSERT into v4 values(2014,0);INSERT into v4 values(2015,0); INSERT into v4 values(2016,0); INSERT into v4 values(2017,0); ' + 
    ' CREATE view totalwides AS SELECT season_year,max(COUNT) as count FROM v4 GROUP BY season_year; '+
    ' create TABLE v5 as select match.season_year, count(ball_by_ball.bowler) from match,ball_by_ball,player WHERE ball_by_ball.extra_type = '+"'Noballs'"+' AND player.player_name = ' + 
    "'" + arg1 + "'" + ' AND ball_by_ball.bowler = player.player_id AND match.match_id = ball_by_ball.match_id group by match.season_year,ball_by_ball.bowler ;' + 
    ' INSERT into v5 values(2008,0); INSERT into v5 values(2009,0); INSERT into v5 values(2010,0); INSERT into v5 values(2011,0);INSERT into v5 values(2012,0);INSERT into v5 values(2013,0);INSERT into v5 values(2014,0);INSERT into v5 values(2015,0); INSERT into v5 values(2016,0); INSERT into v5 values(2017,0); ' + 
    ' CREATE view totalnoballs AS SELECT season_year,max(COUNT) as count FROM v5 GROUP BY season_year; ' + 
    ' select total_matches.season_year as season_year, total_matches.count as total_matches, totalballs.count as totalballs, wickets.count as wickets,totalwides.count as totalwides, totalnoballs.count as totalnoballs from total_matches,totalballs,totalwides,totalnoballs,wickets ' + 
    ' where total_matches.season_year = wickets.season_year AND wickets.season_year = totalballs.season_year AND totalwides.season_year = wickets.season_year AND totalwides.season_year = totalnoballs.season_year ' + 
    'order by season_year; drop view wickets;drop view total_matches;drop view totalballs;drop view totalnoballs;drop view totalwides; drop table v3; drop table v4;drop table v2; drop table v5; ' ;
}

// match table
let M_sel = function(arg1,arg2)
{
    return 'select match_id, season_year , Team1 ,Team2,Venue_Name , match_winner ' +
    ' ,Win_Type , ManOfMach ,Win_Margin ' +
      'from match where match.'+arg1+' = ' + "'" + arg2 + "'" + ";";
}

let M_selByteam = function(arg2){
    return 'select match_id, season_year , Team1 ,Team2,Venue_Name , match_winner ' +
    ' ,Win_Type , ManOfMach ,Win_Margin ' +
      'from match where match.team1 = ' + "'" + arg2 + "'" + 'or match.team2 = ' + "'" + arg2 + "';";
}

let YrVnue = function(arg1 , arg2)
{
    return 'select match_id, season_year , Team1 ,Team2,Venue_Name , match_winner, Win_Type ,ManOfMach ,Win_Margin from match ' + 
    'where match.season_year '  +  ' =   ' + "'"+ arg1 +"'" + '  and match.venue_name' + ' = ' + "'" + arg2+"'" + ";";
}

let YrTeam = function(arg1, arg2)
{
    return 'select match_id, season_year , Team1 ,Team2,Venue_Name , match_winner , Win_Type ,ManOfMach ,Win_Margin ' +
      'from match where match.season_year = ' + "'"+ arg1 + "'" + ' and (match.team1 = '+ "'"  + arg2 + "'" +  ' or match.team2 = ' + "'" + arg2 +"'"+ ');';
}
let TeamVnue = function(arg1 , arg2)
{
    return 'select match_id, season_year , Team1 ,Team2,Venue_Name , match_winner,Win_Type ,ManOfMach ,Win_Margin FROM match ' + 
    'where  (match.team1 = ' + "'" + arg1 + "'" + 'or match.team2 = ' + "'" + arg1 + "'" + ') and match.venue_name =  ' +"'" + arg2 + "'" + ";" ;
}
let YrNmVn = function(arg1,arg2,arg3)
{
    return 'select match_id, season_year , Team1 ,Team2,Venue_Name , match_winner, Win_Type ,ManOfMach ,Win_Margin FROM match ' +
    'where match.season_year = ' + "'" + arg1 + "'" +' and (match.team1 = ' + "'" + arg2 + "'" +
    ' or match.team2 = ' + "'" + arg2 +"'"+' ) and match.venue_name = ' + "'" + arg3 + "';" ; 
}

let matchDetails = function(matchid,teamName){
    return 'select * from (select * from player_match where match_id = ' + "'" + matchid + "'" +' and player_team = ' + "'" + teamName + "'" +') as foo left outer join player on player.player_id = foo.player_id;';
}

let matchBattingDetails = function(matchid,ino){
    return 'select * from player inner join (select striker,sum(runs_scored) as run, '+
    'SUM(CASE extra_type WHEN '+"'"+'Wides'+"'"+' THEN 0 ELSE ( '+
            'CASE extra_type WHEN '+"'"+'wides'+"'"+' THEN 0 ELSE ( '+
                'CASE extra_type WHEN '+"'"+'Noballs'+"'"+' THEN 0 ELSE ( '+
                    'CASE extra_type WHEN '+"'"+'noballs'+"'"+' THEN 0 ELSE 1 END '+
                ')END '+
            ')END '+
        ')END '+
    ') as balls, '+
    ' sum(case runs_scored when 4 then 1 else 0 end) as fours, sum(case runs_scored when 6 then 1 else 0 end)  as sixes ,round(sum(runs_scored) :: decimal / count(CONCAT(over_id,ball_id,innings_no)) , 2 )*100 as sr, sum(extra_runs) as extra, count(player_out) as outCount '+
    'from ball_by_ball where match_id = ' + "'" + matchid + "'" +' and innings_no =' + "'" + ino + "'" +' group by striker) as foo on foo.striker = player.player_id;';
}

let matchBowlingDetails = function(matchid,ino){
    return 'select * from (select bowler, '+
            'ROUND( '+
                'SUM(CASE extra_type WHEN '+"'"+'Wides'+"'"+' THEN 0 ELSE ( '+
                    'CASE extra_type WHEN '+"'"+'wides'+"'"+' THEN 0 ELSE ( '+
                        'CASE extra_type WHEN '+"'"+'Noballs'+"'"+' THEN 0 ELSE ( '+
                            'CASE extra_type WHEN '+"'"+'noballs'+"'"+' THEN 0 ELSE 1 END '+
                        ')END '+
                    ')END '+
                ')END '+
            '):: DECIMAL/6,1) AS over, '+
        'sum(bowler_wicket) as wickets, sum(runs_scored) as runs, sum(extra_runs) as extra_runs, '+
        'SUM(CASE extra_type WHEN '+"'"+'Byes'+"'"+' THEN extra_runs ELSE ( '+
                    'CASE extra_type WHEN '+"'"+'byes'+"'"+' THEN extra_runs ELSE ( '+
                        'CASE extra_type WHEN '+"'"+'legbyes'+"'"+' THEN extra_runs ELSE ( '+
                            'CASE extra_type WHEN '+"'"+'Legbyes'+"'"+' THEN extra_runs ELSE ( '+
                                'CASE extra_type WHEN '+"'"+'panalty'+"'"+' THEN extra_runs ELSE 0 END '+
                            ')END '+
                        ')END '+
                    ')END '+
                ')END '+
            ') AS bp_extra, '+
        'sum(case extra_type when '+"'"+'wides'+"'"+' then 1 else (case extra_type when '+"'"+'Wides'+"'"+' then 1 else 0 end) end) as wides, sum(case extra_type when '+"'"+'Noballs'+"'"+' then 1 else 0 end) as nb , round(sum(runs_scored+extra_runs) :: decimal / round(sum (COALESCE(case extra_type when '+"'"+'No Extras'+"'"+' then 1 else null end,case extra_type when '+"'"+'legbyes'+"'"+' then 1 else 0 end))::decimal /6,1) , 2 ) as eco '+
    'from ball_by_ball where match_id = ' + "'" + matchid + "'" +' and innings_no =' + "'" + ino + "'" +' group by bowler) as foo left outer join player on player.player_id = foo.bowler;'
}

module.exports = function (_arg){
    this.st_bySk = (arg)=>{return teamDataSearch(arg,'team_sk')}
    this.st_byId = (arg)=>{return teamDataSearch(arg,'team_id')}
    this.st_byName = (arg)=>{return teamDataSearch(arg,'team_name')}

    this.sp_bySk = (arg)=>{return playerDataSearch(arg,'player_sk')}
    this.sp_byId = (arg)=>{return playerDataSearch(arg,'player_id')}
    this.sp_byName = (arg)=>{return playerDataSearch(arg,'player_name')}
    this.sp_byDob = (arg)=>{return playerDataSearch(arg,'dob')}
    this.sp_byBattingHand = (arg)=>{return playerDataSearch(arg,'batting_hand')}
    this.sp_byBowlingHand = (arg)=>{return playerDataSearch(arg,'bowling_skill')}
    this.sp_byCountry = (arg)=>{return playerDataSearch(arg,'country_name')}
    
    this.ss_sx = (arg) => { return SeasonStats_Sixes('6',arg)}
    this.ss_fs = (arg) => { return SeasonStats_Fours('4',arg)}
    this.ss_cf = (arg) => {return SeasonStats_conceededFours('4' , arg)}
    this.ss_cs = (arg) => {return SeasonStats_conceededSixes('6', arg)}
    this.ss_w = (arg) => {return SeasonStats_Wickets(arg)}
    this.topScr = (arg) => {return TopScorers(arg)}
    this.p_stats = (arg) => {return player(arg)}
    this.p_Ball_stats = (arg) => {return Bowlerstats(arg)}

    this.All_teamP = (arg) => {return TPlayers(arg)}
    this.TeamStats  = (arg) => { return TPlStats(arg)}
    this.Vview  = () => { return venueD()}

    this.C = (arg) => {return SelCon(arg.country_name)}
    this.T =(arg) => {return SelTeam(arg.team_name)}
    this.S = (arg) => {return SelSeason(arg.season_year)}
    this.CT = (arg) => {return ConTeam(arg.country_name,arg.team_name)}
    this.ST = (arg) => {return TeamSes(arg.team_name,arg.season_year)}
    this.SC = (arg) => {return ConSes(arg.country_name,arg.season_year)}
    this.CST =(arg) => {return triple(arg.country_name,arg.season_year,arg.team_name)}

    this.seasonTeams = (arg) => {return 'select team1 AS team_name from match where season_year = '+"'"+arg+"'"+' group by team1;'}
    
    this.mBy_Yr =(arg) => {return M_sel('season_year',arg.season_year)}
    this.mBy_Vn =(arg) => {return M_sel('venue_name',arg.venue_name)}
    this.mBy_Tm =(arg) => {return M_selByteam(arg.team_name)}
    this.mBy_YrVn = (arg) => {return YrVnue(arg.season_year,arg.venue_name)}
    this.mBy_YrTm = (arg) => {return YrTeam(arg.season_year,arg.team_name)}
    this.mBy_TmVn = (arg) => {return TeamVnue(arg.team_name,arg.venue_name)}
    this.mBy_YTV = (arg) => {return YrNmVn(arg.season_year,arg.team_name,arg.venue_name)}

    this.M_details = (arg) => {return matchDetails(arg.mid,arg.tm)}
    this.M_batRes = (arg) => {return matchBattingDetails(arg.mid,arg.ino)}
    this.M_bowlRes = (arg) => {return matchBowlingDetails(arg.mid,arg.ino)}
}