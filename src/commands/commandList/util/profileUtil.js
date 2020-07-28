const Items = require("../../../data/items.json");

exports.getBonusStats = function(profile, stat){
  let bonus = 0;
  if(Items[profile.helmet] && Items[profile.helmet].stats[stat]){bonus += Items[profile.helmet].stats[stat];}
  if(Items[profile.chestplate] && Items[profile.chestplate].stats[stat]){bonus += Items[profile.chestplate].stats[stat];}
  if(Items[profile.pants] && Items[profile.pants].stats[stat]){bonus += Items[profile.pants].stats[stat];}
  if(Items[profile.weapon[0]] && Items[profile.weapon[0]].stats[stat]){bonus += Items[profile.weapon[0]].stats[stat];}
  if(Items[profile.weapon[1]] && Items[profile.weapon[1]].stats[stat]){bonus += Items[profile.weapon[1]].stats[stat];}
  if(Items[profile.accessory[0]] && Items[profile.accessory[0]].stats[stat]){bonus += Items[profile.accessory[0]].stats[stat];}
  if(Items[profile.accessory[1]] && Items[profile.accessory[1]].stats[stat]){bonus += Items[profile.accessory[1]].stats[stat];}
  if(Items[profile.accessory[2]] && Items[profile.accessory[2]].stats[stat]){bonus += Items[profile.accessory[2]].stats[stat];}
  return bonus;
}