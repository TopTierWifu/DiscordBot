const CommandInterface = require("../../CommandInterface");
const Inventory = require("../../../models/user/inventory");
const Items = require("../../../data/items.json");
const ItemUtil = require("./util/itemUtil");

const itemTypes = ["helmet"];
const numbers = ["⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹"];

module.exports = new CommandInterface({
  execute: async function(p){
    if(p.args[1]=="add"){
      if(Items[p.args[2]]){
        ItemUtil.addItem(await Inventory.get(p.user.id), Items[p.args[2]].type, p.args[2], 1);
        p.send("Added " + p.args[2] + " to your inventory!")
      } else {
        p.send("That is not a real item!")
      }
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
      embed.fields[i] = {
        "name": type.replace(/^./, type[0].toUpperCase()) + "s:",
        "value": ""//await getCount(await fullInv.get(type)) + "/" + getTotal(type),
        //"inline": true
      };
    }
    for(i=1;i<31;i++){
      if(i%10==0){
      embed.fields[0].value += ":black_square_button:\n";
      } else {
      embed.fields[0].value += ":black_square_button: ";
      } 
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
    if(!embed.fields[0].value){
      embed.fields[0].value = "<:_:732401376910377100>";
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