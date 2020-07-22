const CommandInterface = require("../../CommandInterface");
const Profile = require("../../../models/user/profile");

const stats = { 
  "health" : ":heart:",
  "defence" : ":shield:",
  "strength" : ":crossed_swords:",
  "attack_speed" : ":dagger:",
  "gold_find" : ":moneybag:",
  "speed" : ":dash:",
  "luck": ":four_leaf_clover:",
  "xp_gain": ":star2:"
};

let bonusStats = [];

module.exports = new CommandInterface({
  execute: async function(p){
    showProfile(p);
  }
});

async function showProfile(p){
  let blank = "<:_:732401376910377100>";
  let nl = "\n";
  let i = 1;

  let pf = await Profile.get(p.user.id);

  let embed = {
    "color": 13679088,
    "author": {
      "name": p.user.username + "'s Profile :scroll:",
      "icon_url": p.user.avatarURL
    },
    "thumbnail": {
      "url": p.user.avatarURL
    },
    "fields": [
      {
        "name": "Character",
        "value":blank + pf.helmet + blank + pf.accessory1 + blank + "Tile: " + pf.tile + " (0%)" + nl +
                pf.weapon1 + pf.chestplate + pf.weapon2 + pf.accessory2 + blank + "Gold: " + pf.gold + nl +
                blank + pf.pants + blank + pf.accessory3 + blank + "Experience: " + pf.xp + nl    
      },
      {
        "name": "Stats",
        "value":""
      }
      ]
    };

  for(stat in stats){
    if(i%3==0){
      embed.fields[1].value += stats[stat] + " `" + pf[stat] + "(+" + 0 + ")`" + nl;
    } else {
      embed.fields[1].value += stats[stat] + " `" + pf[stat] + "(+" + 0 + ")` ";
    }
    i++;
  }

  p.send({embed});
}