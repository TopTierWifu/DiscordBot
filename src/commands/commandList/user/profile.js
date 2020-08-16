const CommandInterface = require("../../commandInterface");
const ItemUtil = require("../util/itemUtil");
const EMOJI = require("../../../data/config.json").emoji;
const S = EMOJI.space;
const N = "\n";

module.exports = new CommandInterface({

    alias:["profile", "p"],

    desc: "View your equiped items, gold, and experience",

    category: "User",
    
    execute: async function(p){
        let pf = await p.db.User.findById(p.sender.id) ?? await p.db.User.create({_id: p.sender.id});

        let items = await ItemUtil.getItems(p, pf);
        
        p.embed.author.name = p.sender.username + "'s Profile";
        p.embed.author.icon_url = p.sender.avatarURL;
        p.embed.thumbnail.url = p.sender.avatarURL;
        p.embed.fields[0] = {
            "name": "Character",
            "value":S + 
                    (ItemUtil.getIcon(items.h) ?? EMOJI.helmet) + 
                    S + 
                    (ItemUtil.getIcon(items.a0) ?? EMOJI.ring) + 
                    S + N +
                    (ItemUtil.getIcon(items.w0) ?? EMOJI.weapon) + 
                    (ItemUtil.getIcon(items.c) ?? EMOJI.chestplate) + 
                    (ItemUtil.getIcon(items.w1) ?? EMOJI.weapon) + 
                    (ItemUtil.getIcon(items.a1) ?? EMOJI.necklace) + 
                    S + N + S + 
                    (ItemUtil.getIcon(items.p) ?? EMOJI.pants) + 
                    S + 
                    (ItemUtil.getIcon(items.a2) ?? EMOJI.accessory) + 
                    S + N,
            "inline": true
        };
        p.embed.fields[1] = {
            "name": S,
            "value":"Tile: " + pf.tile + " (" + pf.tileProgress +"%)" + N +
                    "Gold: " + pf.gold + N +
                    "Experience: " + pf.xp + N,
            "inline": true
        };
        p.embed.fields[2] = {
            "name": "Equipment",
            "value": ""
        };
        p.embed.fields[3] = {
            "name": "Stats",
            "value":""
        };

        let i = 1;
        for(stat in EMOJI.stats){
            p.embed.fields[3].value += EMOJI.stats[stat] + " `" + pf[stat] + "(+" + ItemUtil.getBonusStats(items, stat) + ")` ";
            if(i%3==0){p.embed.fields[3].value += N;}
            i++;
        }

        for(item in items){
            if(items[item]){
                p.embed.fields[2].value += ItemUtil.getItemPreview(items[item]);
            }
        }

        if(!p.embed.fields[2].value) p.embed.fields[2].value = S;

        let embed = p.embed;
        p.send({embed});
    }
});