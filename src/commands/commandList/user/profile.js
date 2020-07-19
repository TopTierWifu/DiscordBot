const CommandInterface = require("../../CommandInterface");
const Profile = require("../../../models/user/profile");

const stats = { 
  "health" : ":heart:",
  // "defence" : ":shield:",
  "strength" : ":crossed_swords:",
  // "attack_speed" : ":dagger:",
  // "gold_find" : ":moneybag:",
  // "speed" : ":dash:",
  // "luck": ":four_leaf_clover:",
  // "xp_gain": ":star2:"
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
      "name": p.user.username + "'s Profile",
      "icon_url": p.user.avatarURL
    },
    "thumbnail": {
      "url": p.user.avatarURL
    },
    "fields": [
      {
        "name": "Character",
        "value":pf.helmet + blank + pf.weapon1 + nl +
                pf.chestplate + blank + pf.weapon2 + nl +
                pf.pants + blank + blank + nl +
                blank + blank + blank + nl +
                pf.accessory1 + pf.accessory2 + pf.accessory3
      },
      {
        "name": "Stats",
        "value":""
      }
      ]
    };

  for(stat in stats){
    if(i%2==0){
      embed.fields[1].value += stats[stat] + " **" + pf[stat] + "** (+" + 0 + ") " + nl;
    } else {
      embed.fields[1].value += stats[stat] + " **" + pf[stat] + "** (+" + 0 + ")" + blank;
    }
    i++;
  }

  p.send({embed});
}