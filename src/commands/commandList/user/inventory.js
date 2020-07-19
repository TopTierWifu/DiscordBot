const CommandInterface = require("../../CommandInterface");
const Inventory = require("../../../models/user/inventory");
const Items = require("../../../data/items.json");
const ItemUtil = require("./util/itemUtil");

const itemTypes = ["helmet"];
const numbers = ["⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹"];

module.exports = new CommandInterface({
  execute: async function(p){
    if(p.args[1]=="add"){
      ItemUtil.addItem(await Inventory.get(p.user.id), "helmet", p.args[2], 1);
    } else if(p.args[1] && itemTypes.includes(p.args[1].toLowerCase())){
      openInv(p, p.args[1]);
    } else {
      openInv(p);
    }
  }
});

async function openInv(p, type){
  let fullInv = await Inventory.get(p.user.id);

  let embed = {
    "color": 13679088,
    "author": {
    "name": p.user.username + "'s Inventory",
    "icon_url": p.user.avatarURL
    },
    "fields": []
  };

  if(!type){
    for(i = 0; i < itemTypes.length; i++){
      let type = itemTypes[i];
      let name = type.replace(/^./, type[0].toUpperCase()) + "s:"
      let invPart = await fullInv.get(type);
      embed.fields[i] = {
        "name": name,
        "value": await getCount(invPart) + "/" + getTotal(type),
        "inline": true
      };
    }
  } else {
    embed.fields = [
      {
        "name": type.replace(/^./, type[0].toUpperCase()) + "s:",
        "value": ""
      }
    ];
    let invPart = fullInv.get(type);
    for(item in invPart){
      embed.fields[0].value += invPart[item].icon + toCount(invPart[item].amount) + " ";
    }
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

async function getCount(invPart){
  let total = 0;
  for(item in invPart){total++;}
  return total;
}

function toCount(num){
  for(i = 0; i < numbers.length; i++){
    num = num.toString().replace(new RegExp(i, "g"), numbers[i]);
  }
  return num;
}