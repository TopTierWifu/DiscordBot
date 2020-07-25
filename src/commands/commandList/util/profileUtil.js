const Items = require("../../../data/items.json");
const Map = require("../../../data/map.json");

exports.getBonusStats = function(profile, stat){
  let bonus = 0;
  if(Items[profile.helmet] && Items[profile.helmet].stats[stat]){bonus += Items[profile.helmet].stats[stat];}
  if(Items[profile.chestplate] && Items[profile.chestplate].stats[stat]){bonus += Items[profile.helmet].stats[stat];}
  if(Items[profile.pants] && Items[profile.pants].stats[stat]){bonus += Items[profile.helmet].stats[stat];}
  if(Items[profile.weapon[0]] && Items[profile.weapon[0]].stats[stat]){bonus += Items[profile.helmet].stats[stat];}
  if(Items[profile.weapon[1]] && Items[profile.weapon[1]].stats[stat]){bonus += Items[profile.helmet].stats[stat];}
  if(Items[profile.accessory[0]] && Items[profile.accessory[0]].stats[stat]){bonus += Items[profile.helmet].stats[stat];}
  if(Items[profile.accessory[1]] && Items[profile.accessory[1]].stats[stat]){bonus += Items[profile.helmet].stats[stat];}
  if(Items[profile.accessory[2]] && Items[profile.accessory[2]].stats[stat]){bonus += Items[profile.helmet].stats[stat];}
  return bonus;
}

exports.getAdventureTitle = function(profile){
  let tile = Map.map[profile.tile];
  switch(tile){
    case "🌳":
      return "Adventure in the Forest";
    break;
    case "🌱":
      return "Exploring the Plains";
    break;
    case "🌊":
      return "Swimming in the Pond";
    break;
    case "⛰️":
      return "Climbing mountains";
    break;
    case "🏔️":
      return "Playing in the snow";
    break;
  }
}