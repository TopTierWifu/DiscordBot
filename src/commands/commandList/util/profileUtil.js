const Items = require("../../../data/items.json");

exports.getBonusStats = function(p, stat){
  let bonus = 
  (Items[p.helmet]?.stats[stat] ?? 0) +
  (Items[p.chestplate]?.stats[stat] ?? 0) +
  (Items[p.pants]?.stats[stat] ?? 0) +
  (Items[p.weapon[0]]?.stats[stat] ?? 0) +
  (Items[p.weapon[1]]?.stats[stat] ?? 0) +
  (Items[p.accessory[0]]?.stats[stat] ?? 0) + 
  (Items[p.accessory[1]]?.stats[stat] ?? 0) +
  (Items[p.accessory[2]]?.stats[stat] ?? 0);
  return bonus;
}