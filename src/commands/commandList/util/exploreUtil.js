const ItemUtil = require("../util/itemUtil");
const Enemies = require("../../../data/enemies.json");
const Map = require("../../../data/map.json");

exports.getEncounter = async function(p){
    let user = await p.db.User.findById(p.sender.id) ?? await p.db.User.create({_id: p.sender.id});
    //In case I want to add different types of encounters later
    //Add a type value to the "e" for new types
    return await initBattleState(p, user);
}

async function initBattleState(p, user){
    let en = getEnemy(user.tile);
    if(!en){p.send("Could not find any monsters for tile " + user.tile); return;}
    let items = await ItemUtil.getItems(p, user);

    let e = {};
    e.pl = {
        name: p.sender.username,
        health: getStat(user, items, "health"),
        strength: getStat(user, items, "strength"),
        defense: getStat(user, items, "defense"),
        tile: user.tile,
        bestTile: user.bestTile,
        tileProgress: user.tileProgress,
        tileInc: 1 + ((user.speed + ItemUtil.getBonusStats(items, "speed")) * 0.1)
    };
    e.en = {
        name: Enemies[en].name,
        health: Enemies[en].stats.health,
        strength: Enemies[en].stats.strength,
        defense: Enemies[en].stats.defense,
        gold: Enemies[en].gold,
        xp: Enemies[en].xp,
        url: Enemies[en].url
    };
    e.title = getAdventureTitle(e.pl.tile);
    e.profile = user;
    e.type = "battle";
    e.update = {};
    
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

function getStat(user, items, stat){
    return user[stat] + ItemUtil.getBonusStats(items, stat);
}

function getAdventureTitle(tile){
    let tileSetID = Map.map[tile];
    switch(tileSetID){
      case "0": return "Adventure in the Forest"; break;
      case "1": return "Exploring the Plains"; break;
      case "2": return "Swimming in the Pond"; break;
      case "3": return "Climbing mountains"; break;
      case "4": return "Playing in the snow"; break;
      case "5": return "Traversing the desert"; break;
    }
}