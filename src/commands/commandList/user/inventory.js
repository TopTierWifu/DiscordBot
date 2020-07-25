const CommandInterface = require("../../CommandInterface");
const Inventory = require("../../../models/user/inventory");
const ItemUtil = require("../util/itemUtil");
const Items = require("../../../data/items.json");

module.exports = new CommandInterface({
  execute: async function(p){
    if(p.args[1]=="add"){
      ItemUtil.addItem(p, p.args[2]);
    } else {
      openInv(p);
    }
  }
});

async function openInv(p){
  let fullInv = await Inventory.get(p.user.id);
  let items = await fullInv.get("items");

  let embed = {
    "color": 13679088,
    "author": {
    "name": p.user.username + "'s Inventory",
    "icon_url": p.user.avatarURL
    },
    "fields": [
      {
        "name": "Inventory",
        "value": ""
      }
    ],
    "footer": {
      "text": items.length + "/30 Slots Used | Worth: " + getValue(items) + " Gold"
    },
  };

  for(i=1;i<=30;i++){
    if(items[i-1]){
      embed.fields[0].value += Items[items[i-1]].icon;
    } else {
      embed.fields[0].value += ":white_small_square:";
    }
    if(i%10==0){
    embed.fields[0].value += "\n";
    } else {
    embed.fields[0].value += " ";
    } 
  }

  p.send({embed});
}

function getValue(items){
  let value = 0;
  for(item in items){
    if(Items[items[item]].value){value += Items[items[item]].value;}
  }
  return value;
}