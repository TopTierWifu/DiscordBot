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

  let msg = 
    blank + ":scroll: **" + p.user.username + "'s Profile**" + nl +
    "__Character:__" + nl +
    blank + pf.helmet + blank + pf.accessory1 + blank + "Tile: " + pf.tile + nl +
    pf.weapon1 + pf.chestplate + pf.weapon2 + pf.accessory2 + blank + "Gold: " + pf.gold + nl +
    blank + pf.pants + blank + pf.accessory3 + blank + "Experience: " + pf.xp + nl +
    "__Stats:__" + nl;

  for(stat in stats){
    if(i%3==0){
      msg += stats[stat] + " `" + pf[stat] + " (+" + 0 + ")`" + nl;
    } else {
      msg += stats[stat] + " `" + pf[stat] + "(+" + 0 + ")` ";
    }
    i++;
  }

  p.send(msg);
}