const CommandInterface = require("../../commandInterface");
const ExploreUtil = require("../util/exploreUtil");
const TIMEOUT = 1000;

module.exports = new CommandInterface({

    alias:["explore", "e"],

    usage: "",

    desc: "Explore the map to fight monsters, find loot, and level up",

    examples: ["explore"],

    category: "Exploration",

    execute: async function(p){
        let encounter = await ExploreUtil.getEncounter(p);
        if(!encounter) return;
        switch(encounter.type){
            case "battle":
                let battleState = await initBattle(p, encounter);
                setTimeout(async function(){
                    try{await completeBattle(battleState);}
                    catch(err){console.error(err);}
                },TIMEOUT);
            break;
            default:
                p.send("I should never send this, oop (explore.js)");
        }
    }
});

async function initBattle(p, e){
    let embed = p.embed(e.title, p.sender.avatarURL);
    embed.thumbnail.url = e.en.url;
    embed.fields[0] = {
        "name": e.pl.name,
        "value": p.config.stats.health + " `" + e.pl.health + "`",
        "inline": true};
    embed.fields[1] = {
        "name": p.config.emoji.space,
        "value": p.config.emoji.battle,
        "inline": true};
    embed.fields[2] = {
        "name": e.en.name,
        "value": p.config.stats.health + " `" + e.en.health + "`",
        "inline": true};

    let msg = await p.send({embed});
    return({e,p,msg,embed});
}

async function completeBattle(s){
   let pl = s.e.pl;
   let en = s.e.en;
   let embed = s.embed;
   let heart = s.p.config.stats.health;
   
    if(pl.health < 1){
        embed.footer = {text: "You died!"}
        await s.msg.edit({embed});
        return;
    } else if(en.health < 1) {
        embed.footer = {text: "You defeated " + en.name + " and got " + en.gold + " gold & " + en.xp + " experience!"}
        await s.msg.edit({embed});

        s.e.update.$inc = {gold: en.gold, xp: en.xp};
        if(pl.tileProgress + pl.tileInc < 100) {s.e.update.$inc.tileProgress = pl.tileInc;}
        else {
            if(pl.tile == pl.bestTile) {s.e.update.$inc.bestTile = 1;}
            s.e.update.$set = {tileProgress: 0};
        }
        await s.p.db.User.updateOne({ _id: s.p.sender.id}, s.e.update);
        if(s.e.update.$set){await s.p.send(":tada: **|** You completed tile " + pl.tile);}
        return;
    }

    let plDmgOutput = pl.strength - en.defense < 0 ? 0 : pl.strength - en.defense;  //Move to explore util?
    let enDmgOutput = en.strength - pl.defense < 0 ? 0 : en.strength - pl.defense;

    pl.health = pl.health - enDmgOutput < 1 ? 0 : pl.health - enDmgOutput;
    en.health = en.health - plDmgOutput < 1 ? 0 : en.health - plDmgOutput;
    
    s.embed.fields[0].value = heart + " `" + pl.health + "`";
    s.embed.fields[2].value = heart + " `" + en.health + "`";

    s.embed.footer = {text: "You attack " + en.name + " for ❤️" + plDmgOutput + ", and " + en.name + " hits you for ❤️" + enDmgOutput + "!"};

    s.e.pl = pl;
    s.e.en = en;
    s.msg = await s.msg.edit({embed});

    setTimeout(async function(){
        try{await completeBattle(s);}
        catch(err){console.error(err);}
    },TIMEOUT);
}