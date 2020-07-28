const CommandInterface = require("../../commandInterface");
const ProfileUtil = require("../util/profileUtil");
const Items = require("../../../data/items.json");

module.exports = new CommandInterface({

    alias:["profile", "p"],

    usage: "",

    desc: "View your equipment, gold, stats and more",

    examples: ["profile"],

    category: "User",
    
    execute: async function(p){
        showProfile(p);
    }
});

async function showProfile(p){
    let b = p.config.emoji.blank;
    let nl = "\n";

    let pf = await p.db.User.findById(p.sender.id);
    if(!pf)  pf = await p.db.User.create({_id: p.sender.id});

    let embed = p.embed(p.sender.username + "'s Profile", p.sender.avatarURL);
    embed.thumbnail.url = p.sender.avatarURL;
    embed.fields[0] = {
        "name": "Character",
        "value":b + 
                (Items[pf.helmet] ? Items[pf.helmet].icon : "<:hIcon:737328461445595148>") + 
                b + 
                (Items[pf.accessory[0]] ? Items[pf.accessory[0]].icon : "<:rIcon:732828071346044960>") + 
                b + nl +
                (Items[pf.weapon[0]] ? Items[pf.weapon[0]].icon : "<:wIcon:732825599319605259>") + 
                (Items[pf.chestplate] ? Items[pf.chestplate].icon : "<:cIcon:737328461454245949>") + 
                (Items[pf.weapon[1]] ? Items[pf.weapon[1]].icon : "<:wIcon:732825599319605259>") + 
                (Items[pf.accessory[1]] ? Items[pf.accessory[1]].icon : "<:nIcon:732983438298316951>") + 
                b + nl + b + 
                (Items[pf.pants] ? Items[pf.pants].icon : "<:pIcon:737329081871368283>") + 
                b + 
                (Items[pf.accessory[2]] ? Items[pf.accessory[2]].icon : "<:aIcon:732981186712043600>") + 
                b + nl,
        "inline": true
    };
    embed.fields[1] = {
        "name": b,
        "value":"Tile: " + pf.tile + " (" + pf.tileProgress +"%)" + nl +
                "Gold: " + pf.gold + nl +
                "Experience: " + pf.xp + nl,
        "inline": true
    };
    embed.fields[2] = {
        "name": "Stats",
        "value":""
    };

    let i = 1;
    for(stat in p.config.stats){
        embed.fields[2].value += p.config.stats[stat] + " `" + pf[stat] + "(+" + ProfileUtil.getBonusStats(pf, stat) + ")` ";
        if(i%3==0){
          embed.fields[2].value += nl;
        }
        i++;
    }

    p.send({embed});
}
