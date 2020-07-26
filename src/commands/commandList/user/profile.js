const CommandInterface = require("../../CommandInterface");
const Profile = require("../../../models/user/profile");
const ProfileUtil = require("../util/profileUtil");
const Items = require("../../../data/items.json");

const Stats = { 
  "health" : ":heart:",
  "defence" : ":shield:",
  "strength" : ":crossed_swords:",
  "attack_speed" : ":dagger:",
  "gold_find" : ":moneybag:",
  "speed" : ":dash:",
  "luck": ":four_leaf_clover:",
  "xp_gain": ":star2:"
};

module.exports = new CommandInterface({

  arguments:"",
  
  description: "Displays your profile",

  examples: ["profile"],

  category: "User",
  
  execute: async function(p){
    showProfile(p);
  }
});

async function showProfile(p){
  let b = "<:_:732401376910377100>";
  let nl = "\n";
  let i = 1;

  let pf = await Profile.get(p.user.id);

  let embed = {
    "color": 13679088,
    "author": {
      "name": p.user.username + "'s Profile",
      "icon_url": p.user.avatarURL
    },
    "thumbnail": {
      "url": p.user.avatarURL
    },
    "fields": [
      {
        "name": "Character",
        "value":b + 
                (Items[pf.helmet] ? Items[pf.helmet].icon : "<:hIcon:732820031372656721>") + 
                b + 
                (Items[pf.accessory[0]] ? Items[pf.accessory[0]].icon : "<:rIcon:732828071346044960>") + 
                b + nl +
                (Items[pf.weapon[0]] ? Items[pf.weapon[0]].icon :"<:wIcon:732825599319605259>") + 
                (Items[pf.chestplate] ? Items[pf.chestplate].icon : "<:cIcon:732821083463614554>") + 
                (Items[pf.weapon[1]] ? Items[pf.weapon[1]].icon : "<:wIcon:732825599319605259>") + 
                (Items[pf.accessory[1]] ? Items[pf.accessory[1]].icon : "<:nIcon:732983438298316951>") + 
                b + nl + b + 
                (Items[pf.pants] ? Items[pf.pants].icon : "<:pIcon:732822688258588765>") + 
                b + 
                (Items[pf.accessory[2]] ? Items[pf.accessory[2]].icon : "<:aIcon:732981186712043600>") + 
                b + nl,
        "inline": true
      },
      {
        "name": b,
        "value":"Tile: " + pf.tile + " (" + pf.tileProgress +"%)" + nl +
                "Gold: " + pf.gold + nl +
                "Experience: " + pf.xp + nl,
        "inline": true
      },
      {
        "name": "Stats",
        "value":""
      }
      ]
    };

  for(stat in Stats){
    embed.fields[2].value += Stats[stat] + " `" + pf[stat] + "(+" + ProfileUtil.getBonusStats(pf, stat) + ")` ";
    if(i%3==0){
      embed.fields[2].value += nl;
    }
    i++;
  }

  p.send({embed});
}