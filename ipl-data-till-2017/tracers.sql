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
from ball_by_ball,match where bowler_wicket = '1' and match.season_year = '2010' and match.match_id = ball_by_ball.match_id
 group by bowler order by count(bowler) desc)as a1 , player 
where player.player_id = a1.bowler group by a1.a2 , player.player_name order by a1.a2 desc;

create view runs_in_ball AS
select runs_scored ,striker,season_year from ball_by_ball,match where match.match_id= ball_by_ball.match_id;

select a1.sum,player_name from
(select sum(runs_scored),striker from runs_in_ball where  season_year = '2010' 
group by striker order by sum(runs_scored) desc) as a1 , player where player.Player_Id = a1.striker 
group by a1.striker,a1.sum,player_name order by a1.sum desc;

drop view runs_in_balls;
