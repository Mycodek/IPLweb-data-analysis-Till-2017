let teamDataSearch =function(arg1,arg2){
    return 'Select * From Team WHERE Team.'+arg2+'='+"'"+arg1+"';";
}
let playerDataSearch =function(arg1,arg2){
    return 'Select * From player WHERE player.'+arg2+'='+"'"+arg1+"';";
}

let SeasonStats_Sixes = function(arg1,arg2){
    return 'select a1.a2 as sixes,player.player_name from (select striker,count(striker) as a2 from ball_by_ball,match where runs_scored =' +"'"+ arg1+"'" + 'and match.season_year = ' +"'"+ arg2 +"'" + ' and match.match_id = ball_by_ball.match_id  group by striker order by count(striker) desc)as a1 , player  where player.player_id = a1.striker group by a1.a2 , player.player_name order by a1.a2 desc;' ;
}

let SeasonStats_Fours = function(arg1,arg2){
    return 'select a1.a2 as fours,player.player_name from (select striker,count(striker) as a2 from ball_by_ball,match where runs_scored =' + "'" +arg1+"'" + 'and match.season_year = ' +"'"+ arg2 +"'"+ ' and match.match_id = ball_by_ball.match_id  group by striker order by count(striker) desc)as a1 , player  where player.player_id = a1.striker group by a1.a2 , player.player_name order by a1.a2 desc;' ;
}
let SeasonStats_conceededFours = function(arg1,arg2)
{
    return 'select a1.a2 as fours,player.player_name from (select bowler,count(bowler) as a2 ' + 
   ' from ball_by_ball,match where runs_scored = '+"'" + arg1 +"'"+' and match.season_year = ' + "'"+
   arg2 +"'" +' and match.match_id = ball_by_ball.match_id group by bowler order by count(bowler) desc)as a1 , player ' +
   ' where player.player_id = a1.bowler group by a1.a2 , player.player_name order by a1.a2 desc';
}

let SeasonStats_conceededSixes = function(arg1,arg2)
{
    return 'select a1.a2 as sixes,player.player_name from (select bowler,count(bowler) as a2 ' + 
   ' from ball_by_ball,match where runs_scored = ' +"'" + arg1 +"'" +' and match.season_year = ' + "'" +
   "'" +arg2 +"'"+' and match.match_id = ball_by_ball.match_id group by bowler order by count(bowler) desc)as a1 , player ' +
   ' where player.player_id = a1.bowler group by a1.a2 , player.player_name order by a1.a2 desc;';
}

let SeasonStats_Wickets = function(arg1)
{
    return 'select a1.a2 as wickets,player.player_name from (select bowler,count(bowler) as a2 ' +
    'from ball_by_ball,match where bowler_wicket = 1 and match.season_year = ' + "'" + arg1 +"'" + 'and match.match_id = ball_by_ball.match_id' +
     'group by bowler order by count(bowler) desc)as a1 , player ' +
   ' where player.player_id = a1.bowler group by a1.a2 , player.player_name order by a1.a2 desc;';
}

let TopScorers = function(arg1)
{
return  'create view runs_in_ball AS' +
'select runs_scored ,striker,season_year from ball_by_ball,match where match.match_id= ball_by_ball.match_id' + ";" +
'select a1.sum,player_name from ' +
'(select sum(runs_scored),striker from runs_in_ball where  season_year = '+"'" + arg1 + "'" + 
'group by striker order by sum(runs_scored) desc) as a1 , player where player.Player_Id = a1.striker ' +
'group by a1.striker,a1.sum,player_name order by a1.sum desc' + ";" +
'drop view runs_in_ball;';
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
    this.topScr = (arg) => {return TopScorers(arg1)}

}
