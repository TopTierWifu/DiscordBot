const CommandInterface = require("../../CommandInterface");
const Enemies = require("../../../data/enemies.json");
const Profile = require("../../../models/user/profile");
const ProfileUtil = require("../util/profileUtil");

module.exports = new CommandInterface({
    execute: async function(p){
        let startingState = await startEncounter(p);
        if(!startingState){return;}
        setTimeout(async function(){
            try{await completeEncounter(startingState);}
            catch(err){console.error(err);}
        },3000);
    }
  });

async function startEncounter(p){
    let e = await getEncounter(p);
    if(!e){return;}

    let embed = {
        "color": 13679088,
        "author": {
          "name": "Adventure in the Forest",
          "icon_url": p.user.avatarURL
        },
        "thumbnail": {
          "url": e.en.url
        },
        "fields": [
          {
            "name": e.pl.name,
            "value":":heart: `" + e.pl.health + "`",
            "inline": true
          },
          {
            "name": "<:_:732401376910377100>",
            "value":":crossed_swords:",
            "inline": true
          },
          {
            "name": e.en.name.replace(/^./, e.en.name[0].toUpperCase()),
            "value":":heart: `" + e.en.health + "`",
            "inline": true
          }
        ]
        };
    
    let msg = await p.send({embed});
    return({e,msg,embed});
}

async function getEncounter(p){
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
    
    return e;
}

async function completeEncounter(state){
    let pl = state.e.pl;
    let en = state.e.en;

    if(pl.health < 1){
        state.embed.footer = {
            "text": "You died!"
        }
        let embed = state.embed;
        await state.msg.edit({embed});
        return;
    } else if(en.health < 1) {
        state.embed.footer = {
            "text": "You defeated " + en.name + " and got " + en.gold + " gold & " + en.xp + " experience"
        }
        //state.embed.thumbnail.url = "https://cdn.discordapp.com/attachments/732695357602922596/736627781722701834/upscaledGrave.png";
        let embed = state.embed;
        await state.msg.edit({embed});
        //Add loot, gold, and xp drop fnx here
        return;
    }

    state.e.pl.health -= en.strength - pl.defence;
    state.e.en.health -= pl.strength - en.defence;

    state.e.pl.health = state.e.pl.health < 1 ? 0 : state.e.pl.health;    
    state.e.en.health = state.e.en.health < 1 ? 0 : state.e.en.health;

    state.embed.fields[0].value = ":heart: `" + state.e.pl.health + "`"
    state.embed.fields[2].value = ":heart: `" + state.e.en.health + "`"

    state.embed.footer = {
        "text": "You attack " + en.name + " for ❤️" + (pl.strength - en.defence) + ", and " + en.name + " hits you for ❤️" + (en.strength - pl.defence) + "!"
    }

    let embed = state.embed;
    let msg = await state.msg.edit({embed});
    let e = state.e;

    setTimeout(async function(){
        try{await completeEncounter({e, msg, embed});}
        catch(err){console.error(err);}
    },3000);
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
