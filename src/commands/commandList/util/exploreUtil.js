const Enemies = require("../../../data/enemies.json");
const Profile = require("../../../models/user/profile");
const ProfileUtil = require("../util/profileUtil");

exports.getEncounter = async function(p){
    let pl = await Profile.get(p.user.id);
    let en = getEnemy(pl.tile);
    if(!en){p.send("Could not find any monsters for this tile"); return;}

    let e = {};
    e.pl = {
        name: p.user.username,
        health: pl.health + ProfileUtil.getBonusStats(pl, "health"),
        strength: pl.strength + ProfileUtil.getBonusStats(pl, "strength"),
        defence: pl.defence + ProfileUtil.getBonusStats(pl, "defence")
    };
    e.en = {
        name: en,
        health: Enemies[en].stats.health,
        strength: Enemies[en].stats.strength,
        defence: Enemies[en].stats.defence,
        gold: Enemies[en].gold,
        xp: Enemies[en].xp,
        url: Enemies[en].url
    };
    e.adventureTitle = ProfileUtil.getAdventureTitle(pl);
    e.profile = pl;
    
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

exports.giveDrops = function(profile, gold, xp){
    profile.gold += gold;
    profile.xp += xp;
    return profile;
}

exports.addTileProgress = function(profile){
    profile.tileProgress += 1 + ((profile.speed + ProfileUtil.getBonusStats(profile, "speed")) * 0.1);
    return profile;
}