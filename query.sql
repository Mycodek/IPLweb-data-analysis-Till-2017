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

-- xtra queries
SELECT country_name
FROM player
GROUP BY country_name;