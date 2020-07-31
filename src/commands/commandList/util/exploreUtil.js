const ProfileUtil = require("../util/profileUtil");
const Enemies = require("../../../data/enemies.json");
const Map = require("../../../data/map.json");

exports.getEncounter = async function(p){
    let user = await p.db.User.findById(p.sender.id);
    if(!user)  user = await p.db.User.create({_id: p.sender.id});
    //In case I want to add different types of encounters later
    //Add a type value to the "e" for new types
    return initBattleState(p, user);
}

function initBattleState(p, user){
    let en = getEnemy(user.tile);
    if(!en){p.send("Could not find any monsters for this tile"); return;}

    let e = {};
    e.pl = {
        name: p.sender.username,
        health: user.health + ProfileUtil.getBonusStats(user, "health"),
        strength: user.strength + ProfileUtil.getBonusStats(user, "strength"),
        defense: user.defense + ProfileUtil.getBonusStats(user, "defense"),
        tile: user.tile,
        bestTile: user.bestTile,
        tileProgress: user.tileProgress,
        tileInc: 1 + ((user.speed + ProfileUtil.getBonusStats(user, "speed")) * 0.1)
    };
    e.en = {
        name: en,
        health: Enemies[en].stats.health,
        strength: Enemies[en].stats.strength,
        defense: Enemies[en].stats.defense,
        gold: Enemies[en].gold,
        xp: Enemies[en].xp,
        url: Enemies[en].url
    };
    e.title = getAdventureTitle(user);
    e.profile = user;
    e.type = "battle";
    
    return e;
}

function getEnemy(tile){
    let possible = []
    for(enemy in Enemies){
        if(Enemies[enemy].tiles.includes(tile)){
            possible.push(enemy);
        }
    }
    return possible[Math.floor(Math.random() * possible.length)];
}

function getAdventureTitle(user){
    let tile = Map.map[user.tile];
    switch(tile){
      case "🌳":
        return "Adventure in the Forest";
      break;
      case "🌱":
        return "Exploring the Plains";
      break;
      case "🌊":
        return "Swimming in the Pond";
      break;
      case "⛰️":
        return "Climbing mountains";
      break;
      case "🏔️":
        return "Playing in the snow";
      break;
    }
}