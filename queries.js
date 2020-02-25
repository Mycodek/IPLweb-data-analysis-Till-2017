let teamDataSearch =function(arg1,arg2){
    return 'Select * From Team WHERE Team.'+arg2+'='+"'"+arg1+"'";
}
let playerDataSearch =function(arg1,arg2){
    return 'Select * From player WHERE player.'+arg2+'='+"'"+arg1+"'";
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

}