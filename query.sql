CREATE TABLE Team(
    Team_SK integer,
    Team_ID integer,
    Team_Name varchar
);

\copy Team(Team_SK,Team_ID,Team_Name) FROM '/home/kailash/Desktop/6th_Sem/dbms/Project/ipl-data-till-2017/Team.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE Player_match(
    Player_match_SK INTEGER,
    PlayerMatch_key VARCHAR,
    Match_Id INTEGER,
    Player_Id INTEGER,
    Player_Name varchar,
    DOB VARCHAR,
    Batting_hand VARCHAR,
    Bowling_skill VARCHAR,
    Country_Name VARCHAR,
    Role_Desc VARCHAR,
    Player_team VARCHAR,
    Opposit_Team VARCHAR,
    Season_year INTEGER,
    is_manofThematch INTEGER,
    Age_As_on_match INTEGER,
    IsPlayers_Team_won INTEGER,
    Player_Captain VARCHAR,
    Opposit_captain VARCHAR,
    Player_keeper VARCHAR,
    Opposit_keeper VARCHAR
);

\copy Player_match(Player_match_SK, PlayerMatch_key, Match_Id, Player_Id, Player_Name,DOB, Batting_hand,Bowling_skill,Country_Name, Role_Desc ,Player_team ,Opposit_Team ,Season_year, is_manofThematch, Age_As_on_match,IsPlayers_Team_won ,Player_Captain,Opposit_captain,Player_keeper,Opposit_keeper) FROM '/home/kailash/Desktop/6th_Sem/dbms/Project/ipl-data-till-2017/Player_match.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE Player(
    PLAYER_SK integer,
    Player_Id integer,
    Player_Name varchar,
    DOB VARCHAR,
    Batting_hand VARCHAR,
    Bowling_skill VARCHAR,
    Country_Name VARCHAR
);

\copy Player( PLAYER_SK,Player_Id,Player_Name,DOB,Batting_hand, Bowling_skill,Country_Name ) FROM '/home/kailash/Desktop/6th_Sem/dbms/Project/ipl-data-till-2017/Player.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE Match(
    Match_SK INTEGER,
    match_id INTEGER,
    Team1 VARCHAR,
    Team2 VARCHAR,
    match_date VARCHAR,
    Season_Year INTEGER,
    Venue_Name VARCHAR,
    City_Name VARCHAR,
    Country_Name VARCHAR,
    Toss_Winner VARCHAR,
    match_winner Varchar,
    Toss_Name varchar,
    Win_Type varchar,
    Outcome_Type varchar,
    ManOfMach varchar,
    Win_Margin VARCHAR,
    Country_id integer
);


\copy Match( Match_SK, match_id,Team1,Team2,match_date, Season_Year , Venue_Name , City_Name , Country_Name,Toss_Winner , match_winner , Toss_Name ,Win_Type , Outcome_Type ,ManOfMach , Win_Margin ,Country_id ) FROM '/home/kailash/Desktop/6th_Sem/dbms/Project/ipl-data-till-2017/Match.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE Ball_By_Ball(
    MatcH_id INTEGER,
    Over_id INTEGER,
    Ball_id INTEGER,
    Innings_No INTEGER,
    Team_Batting INTEGER, 
    Team_Bowling INTEGER,
    Striker_Batting_Position INTEGER,
    Extra_Type VARCHAR,
    Runs_Scored INTEGER,
    Extra_runs INTEGER,
    Wides INTEGER,
    Legbyes INTEGER,
    Byes INTEGER,
    Noballs INTEGER,
    Penalty INTEGER,
    Bowler_Extras INTEGER,
    Out_type VARCHAR,
    Caught INTEGER,
    Bowled INTEGER,
    Run_out INTEGER,
    LBW INTEGER,
    Retired_hurt INTEGER,
    Stumped INTEGER,
    caught_and_bowled INTEGER,
    hit_wicket INTEGER,
    ObstructingFeild INTEGER,
    Bowler_Wicket INTEGER,
    Match_Date varchar,
    Season INTEGER,
    Striker INTEGER,
    Non_Striker INTEGER,
    Bowler INTEGER,
    Player_Out INTEGER,
    Fielders INTEGER,
    Striker_match_SK INTEGER,
    StrikerSK INTEGER,
    NonStriker_match_SK INTEGER,
    NONStriker_SK INTEGER,
    Fielder_match_SK INTEGER,
    Fielder_SK INTEGER,
    Bowler_match_SK INTEGER,
    BOWLER_SK INTEGER,
    PlayerOut_match_SK INTEGER,
    BattingTeam_SK INTEGER,
    BowlingTeam_SK INTEGER,
    Keeper_Catch INTEGER,
    Player_out_sk INTEGER,
    MatchDateSK VARCHAR
);

\copy Ball_By_Ball(MatcH_id,Over_id,Ball_id,Innings_No,Team_Batting,Team_Bowling,Striker_Batting_Position,Extra_Type,Runs_Scored,Extra_runs,Wides,Legbyes,Byes,Noballs,Penalty,Bowler_Extras,Out_type,Caught,Bowled,Run_out,LBW,Retired_hurt,Stumped,caught_and_bowled,hit_wicket,ObstructingFeild,Bowler_Wicket,Match_Date,Season,Striker,Non_Striker,Bowler,Player_Out,Fielders,Striker_match_SK,StrikerSK,NonStriker_match_SK,NONStriker_SK,Fielder_match_SK,Fielder_SK,Bowler_match_SK,BOWLER_SK,PlayerOut_match_SK,BattingTeam_SK,BowlingTeam_SK,Keeper_Catch,Player_out_sk,MatchDateSK) FROM '/home/kailash/Desktop/6th_Sem/dbms/Project/ipl-data-till-2017/Ball_By_Ball.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE TEAM DROP TEAM_SK;

ALTER TABLE PLAYER DROP PLAYER_SK;

CREATE TABLE GROUND AS SELECT Distinct(venue_Name),City_Name,Country_Name FROM match order by country_name,City_name;  

CREATE INDEX ground_index ON Ground(Venue_Name);

ALTER TABLE match drop Country_id,drop Country_Name,drop City_Name, drop Match_SK;

Create Table temp_table AS SELECT match_id,player_id,role_desc,player_team FROM player_match;

drop table player_match;

ALTER TABLE temp_table RENAME TO player_match;

CREATE TABLE match_by_team AS SELECT Match_id,Innings_No,Team_batting,Team_bowling FROM ball_by_ball;

CREATE TABLE temp2_table AS SELECT match_id, over_id, ball_id, innings_no, striker_batting_position, extra_type,runs_scored, extra_runs, out_type, striker, non_striker, bowler, player_out,fielders AS fielder,Bowler_Wicket FROM ball_by_ball;

drop table ball_by_ball;

ALTER TABLE temp2_table RENAME TO ball_by_ball;


SELECT * 
FROM (
    SELECT bowler, ROUND(
                SUM(CASE extra_type WHEN 'Wides' THEN 0 ELSE (
                    CASE extra_type WHEN 'wides' THEN 0 ELSE (
                        CASE extra_type WHEN 'Noballs' THEN 0 ELSE (
                            CASE extra_type WHEN 'noballs' THEN 0 ELSE 1 END
                        )END
                    )END
                )END
            ):: DECIMAL/6,1) AS over,
            SUM(bowler_wicket) AS wickets, SUM(runs_scored) AS run,
            SUM(extra_runs) AS extra_runs,
            SUM(CASE extra_type WHEN 'byes' THEN extra_runs ELSE (
                    CASE extra_type WHEN 'Byes' THEN extra_runs ELSE (
                        CASE extra_type WHEN 'legbyes' THEN extra_runs ELSE (
                            CASE extra_type WHEN 'Legbyes' THEN extra_runs ELSE(
                                CASE extra_type WHEN 'panalty' THEN extra_runs ELSE 0 END
                            )END
                        )END
                    )END
                )END ) AS bp_extra,
            SUM(CASE extra_type WHEN 'wides' THEN 1 
            ELSE (CASE extra_type WHEN 'Wides' THEN 1 ELSE 0 END) END) AS wides, 
            SUM(CASE extra_type WHEN 'Noballs' THEN 1 ELSE 0 END) AS nb , 
            ROUND(SUM(runs_scored+extra_runs) :: DECIMAL / ROUND(SUM 
            (COALESCE(CASE extra_type WHEN 'No Extras' THEN 1 ELSE NULL END,CASE extra_type WHEN 'legbyes' THEN 1 ELSE 0 END))::DECIMAL /6,1) , 2 ) AS eco 
    FROM ball_by_ball WHERE match_id = '335987' AND innings_no = '1' GROUP BY bowler) AS foo 
LEFT OUTER JOIN player ON player.player_id = foo.bowler;

SELECT * 
FROM player 
INNER JOIN 
(SELECT striker,SUM(runs_scored) AS run,
    SUM(CASE extra_type WHEN 'Wides' THEN 0 ELSE (
            CASE extra_type WHEN 'wides' THEN 0 ELSE (
                CASE extra_type WHEN 'Noballs' THEN 0 ELSE (
                    CASE extra_type WHEN 'noballs' THEN 0 ELSE 1 END
                )END
            )END
        )END
    ) AS balls,
 SUM(CASE runs_scored WHEN 4 THEN 1 ELSE 0 END) AS fours, 
 SUM(CASE runs_scored WHEN 6 THEN 1 ELSE 0 END)  AS sixes ,
 round(SUM(runs_scored) :: DECIMAL / count(CONCAT(over_id,ball_id,innings_no)) , 2 )*100 AS sr, 
 SUM(extra_runs) AS extra, count(player_out) AS outCount 
 FROM ball_by_ball 
 WHERE match_id = '335987' AND innings_no ='1' GROUP BY striker) AS foo ON foo.striker = player.player_id;