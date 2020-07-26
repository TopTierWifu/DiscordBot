const CommandInterface = require("../../CommandInterface");
const ExploreUtil = require("../util/exploreUtil");

module.exports = new CommandInterface({

  aliases: ["e"],

  arguments:"",

  description: "Explore the world to find gold and loot",

  examples: ["explore"],

  category: "Exploration",

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
    let e = await ExploreUtil.getEncounter(p);
    if(!e){return;}

    let embed = {
        "color": 13679088,
        "author": {
          "name": e.adventureTitle,
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
    return({e,p,msg,embed});
}

async function completeEncounter(s){
    let pl = s.e.pl;
    let en = s.e.en;

    if(pl.health < 1){
        s.embed.footer = {
            "text": "You died!"
        }
        let embed = s.embed;
        await s.msg.edit({embed});
        return;
    } else if(en.health < 1) {
        s.embed.footer = {
            "text": "You defeated " + en.name + " and got " + en.gold + " gold & " + en.xp + " experience"
        }
        //s.embed.thumbnail.url = "https://cdn.discordapp.com/attachments/732695357602922596/736627781722701834/upscaledGrave.png";
        let embed = s.embed;
        await s.msg.edit({embed});
        let profile = ExploreUtil.giveDrops(s.e.profile, en.gold, en.xp);
        profile = ExploreUtil.addTileProgress(profile);
        await profile.save();
        return;
    }

    s.e.pl.health -= en.strength - pl.defence;
    s.e.en.health -= pl.strength - en.defence;

    s.e.pl.health = s.e.pl.health < 1 ? 0 : s.e.pl.health;    
    s.e.en.health = s.e.en.health < 1 ? 0 : s.e.en.health;

    s.embed.fields[0].value = ":heart: `" + s.e.pl.health + "`"
    s.embed.fields[2].value = ":heart: `" + s.e.en.health + "`"

    s.embed.footer = {
        "text": "You attack " + en.name + " for ❤️" + (pl.strength - en.defence) + ", and " + en.name + " hits you for ❤️" + (en.strength - pl.defence) + "!"
    }

    let embed = s.embed;
    let msg = await s.msg.edit({embed});
    let e = s.e;
    let p = s.p

    setTimeout(async function(){
        try{await completeEncounter({e, p, msg, embed});}
        catch(err){console.error(err);}
    },3000);
}

