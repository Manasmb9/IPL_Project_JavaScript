let csvToJson = require('convert-csv-to-json');

let matches = [];
let deliveries = [];

matches = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv("/home/dell/Downloads/matches.csv");
deliveries = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv("/home/dell/Downloads/deliveries.csv");

function findMatchesPlayedPerYear(matches){
    const matchesPerYear = new Map();
    for(match of matches){
        if(matchesPerYear.has(match.season)){
            matchesPerYear.set(match.season, matchesPerYear.get(match.season) + 1);
        }
        else{
            matchesPerYear.set(match.season, 1);
        }
    }
    return matchesPerYear;
}
console.log(findMatchesPlayedPerYear(matches));

function matchesWonPerTeamPerYear(matches){
    let wonPerTeam = new Map();
    
    for(match of matches){
        if(wonPerTeam.has(match.season)){
            if(wonPerTeam.get(match.season).has(match.winner)){
            wonPerTeam.get(match.season).set(match.winner,wonPerTeam.get(match.season).get(match.winner)+1);
            }
            else{
                wonPerTeam.get(match.season).set(match.winner,1);
            }
        }
        else{
            wonPerTeam.set(match.season, new Map().set(match.winner,1));
        }
    }
     console.log(wonPerTeam);
}
 matchesWonPerTeamPerYear(matches);


 function extraRunsConcededPerTeam(matches , deliveries){
    const extraRunsPerTeam = new Map();
    firstmatchid = 0;
    lastmatchid = 0;
    for(match of matches){
        if(match.season == 2016){
            if(firstmatchid == 0){
            firstmatchid = match.id;
            }
            lastmatchid = match.id;
        }
    }
    for(delivery of deliveries){
        if(delivery.match_id>= firstmatchid && delivery.match_id <= lastmatchid){
            if(extraRunsPerTeam.has(delivery.bowling_team)){
                extraRunsPerTeam.set(delivery.bowling_team, extraRunsPerTeam.get(delivery.bowling_team)+delivery.extra_runs)
            }
            else{
                extraRunsPerTeam.set(delivery.bowling_team, delivery.extra_runs);
            }
        }
    }
    return extraRunsPerTeam;
 }
 console.log(extraRunsConcededPerTeam(matches,deliveries));
 
function economy(matches, deliveries, n){
    const bowlerruns = new Map();
    const bowlcount = new Map();
    let economicbowler = new Map();
    
    firstmatchid = 0;
    lastmatchid = 0;
    for(match of matches){
        if(match.season == 2015){
            if(firstmatchid == 0){
            firstmatchid = match.id;
            }
            lastmatchid = match.id;
        }
    }
    for(delivery of deliveries){
        if(delivery.match_id>=firstmatchid && delivery.match_id<=lastmatchid){
            if(bowlcount.has(delivery.bowler)){
                bowlcount.set(delivery.bowler, bowlcount.get(delivery.bowler) + 1); 
            }
            else{
                bowlcount.set(delivery.bowler , 1)
            }
            if(bowlerruns.has(delivery.bowler)){
                bowlerruns.set(delivery.bowler, bowlerruns.get(delivery.bowler)+delivery.total_runs);
            }
            else{
                bowlerruns.set(delivery.bowler, delivery.total_runs);
            }
        }
    }
    for(bowler of bowlerruns.keys()){
        economicBowlerValue = (bowlerruns.get(bowler) * 6.0 / bowlcount.get(bowler));
        economicbowler.set(bowler , economicBowlerValue);
    }
    const sortedAsc = new Map([...economicbowler].sort((a, b) => (a[1] > b[1] ? 1 : -1)));
    for (let i = 0; i < n; i++){
    console.log([...sortedAsc][i]);
    }
}
economy(matches, deliveries, 10);
