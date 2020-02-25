select a1.a2 as sixes,player.player_name from (select striker,count(striker) as a2 
from ball_by_ball,match where runs_scored = '6' and match.season_year = '2010' and match.match_id = ball_by_ball.match_id
group by striker order by count(striker) desc)as a1 , player 
where player.player_id = a1.striker group by a1.a2 , player.player_name order by a1.a2 desc;

select a1.a2 as fours,player.player_name from (select striker,count(striker) as a2 
from ball_by_ball,match where runs_scored = '4' and match.season_year = '2010' and match.match_id = ball_by_ball.match_id
group by striker order by count(striker) desc)as a1 , player 
where player.player_id = a1.striker group by a1.a2 , player.player_name order by a1.a2 desc;


select a1.a2 as sixes,player.player_name from (select bowler,count(bowler) as a2 
from ball_by_ball,match where runs_scored = '6' and match.season_year = '2010' and match.match_id = ball_by_ball.match_id
 group by bowler order by count(bowler) desc)as a1 , player 
where player.player_id = a1.bowler group by a1.a2 , player.player_name order by a1.a2 desc;

select a1.a2 as fours,player.player_name from (select bowler,count(bowler) as a2 
from ball_by_ball,match where runs_scored = '4' and match.season_year = '2010' and match.match_id = ball_by_ball.match_id
 group by bowler order by count(bowler) desc)as a1 , player 
where player.player_id = a1.bowler group by a1.a2 , player.player_name order by a1.a2 desc;

select a1.a2 as wickets,player.player_name from (select bowler,count(bowler) as a2 
from ball_by_ball where bowler_wicket = '1' and season = '2010' group by bowler order by count(bowler) desc)as a1 , player 
where player.player_id = a1.bowler group by a1.a2 , player.player_name order by a1.a2 desc;
