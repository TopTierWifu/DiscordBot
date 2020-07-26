const CommandInterface = require("../../CommandInterface");
const Inventory = require("../../../models/user/inventory");
const Items = require("../../../data/items.json");
const itemTypes = ["helmet"];

module.exports = new CommandInterface({

  category: "User",

  execute: async function(p){
      openIndex(p);
    }
  });

async function openIndex(p){
  let fullInv = await Inventory.get(p.user.id);

  let embed = {
    "color": 13679088,
    "author": {
    "name": p.user.username + "'s Index",
    "icon_url": p.user.avatarURL
    },
    "fields": []
  };

  for(i = 0; i < itemTypes.length; i++){
    let type = itemTypes[i];
    embed.fields[i] = {
      "name": type.replace(/^./, type[0].toUpperCase()) + "s:",
      "value": await getCount(fullInv, type) + "/" + getTotal(type)
    };
  }

  p.send({embed});
}

function getTotal(type) {
  let total = 0;
  for(item in Items){
    if(Items[item].type == type){total++;}
  }
  return total;
}

async function getCount(fullInv, type){
  let total = 0;
  let items = fullInv.get("items")
  for(item in items){
    if(Items[items[item]].type == type){total++;}
  }
  return total;
}