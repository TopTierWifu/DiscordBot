const CommandInterface = require("../../CommandInterface");
const Profile = require("../../../models/user/profile");
const ItemUtil = require("./util/itemUtil");
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

const Defaults = {
  helmet: "<:hIcon:732820031372656721>",
  chestplate: "<:cIcon:732821083463614554>",
  pants: "<:pIcon:732822688258588765>",
  weapon: ["<:wIcon:732825599319605259>", "<:wIcon:732825599319605259>"],
  accessory: ["<:rIcon:732828071346044960>", "<:nIcon:732983438298316951>", "<:aIcon:732981186712043600>"],
};

let bonusStats = [];

module.exports = new CommandInterface({
  execute: async function(p){
    showProfile(p);
  }
});

async function showProfile(p){
  let b = "<:_:732401376910377100>";
  let nl = "\n";
  let i = 1;

  let pf = await Profile.get(p.user.id);
  for(icon in Defaults){
    if(ItemUtil.isItem(pf[icon])){
      pf[icon] = Items[pf[icon]].icon;
    } else if(!ItemUtil.isItem(pf[icon])){
      pf[icon] = Defaults[icon];
    } else if(Array.isArray(pf[icon]) && pf[icon].length == 0){
      pf[icon] = Defaults[icon];
    } else if(Array.isArray(pf[icon])){
      for(item in pf[icon]){
        pf[icon][item] = ItemUtil.isItem(pf[icon][item]);
        for(i = pf[icon].length; i < 3; i++){
          pf[icon].push(Defaults[icon][i]);
        }
      }
    }
  }

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
        "value":b + pf.helmet + b + pf.accessory[0] + b + nl +
                pf.weapon[0] + pf.chestplate + pf.weapon[1] + pf.accessory[1] + b + nl +
                b + pf.pants + b + pf.accessory[2] + b + nl,
        "inline": true
      },
      {
        "name": b,
        "value":"Tile: " + pf.tile + " (0%)" + nl +
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
    if(i%3==0){
      embed.fields[2].value += Stats[stat] + " `" + pf[stat] + "(+" + 0 + ")`" + nl;
    } else {
      embed.fields[2].value += Stats[stat] + " `" + pf[stat] + "(+" + 0 + ")` ";
    }
    i++;
  }

  p.send({embed});
}