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
    let emoji = p.config.emoji;
    let s = emoji.space;
    let nl = "\n";

    let pf = await p.db.User.findById(p.sender.id) ?? await p.db.User.create({_id: p.sender.id});

    let embed = p.embed(p.sender.username + "'s Profile", p.sender.avatarURL);
    embed.thumbnail.url = p.sender.avatarURL;
    embed.fields[0] = {
        "name": "Character",
        "value":s + 
                (Items[pf.helmet]?.icon ?? emoji.helmet) + 
                s + 
                (Items[pf.accessory[0]]?.icon ?? emoji.ring) + 
                s + nl +
                (Items[pf.weapon[0]]?.icon ?? emoji.weapon) + 
                (Items[pf.chestplate]?.icon ?? emoji.chestplate) + 
                (Items[pf.weapon[1]]?.icon ?? emoji.weapon) + 
                (Items[pf.accessory[1]]?.icon ?? emoji.necklace) + 
                s + nl + s + 
                (Items[pf.pants]?.icon ?? emoji.pants) + 
                s + 
                (Items[pf.accessory[2]]?.icon ?? emoji.accessory) + 
                s + nl,
        "inline": true
    };
    embed.fields[1] = {
        "name": s,
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
        if(i%3==0){embed.fields[2].value += nl;}
        i++;
    }

    p.send({embed});
}
