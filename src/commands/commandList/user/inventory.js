const CommandInterface = require("../../commandInterface");
const ItemUtil = require("../util/itemUtil");
const Items = require("../../../data/items.json");

module.exports = new CommandInterface({

    alias:["inventory", "inv"],

    usage: "",

    desc: "View the items in your inventory",

    examples: ["inventory"],

    category: "User",
    
    execute: async function(p){
        if(p.args[0] && p.args[0].toLowerCase()=="add") ItemUtil.addItem(p, p.args[1].toLowerCase());
        else openInv(p);
    }
});

async function openInv(p){
    let user = await p.db.User.findById(p.sender.id, "items");
    if(!user) items = [];
    else items = user.items;

    let embed = p.embed(p.sender.username + "'s Inventory", p.sender.avatarURL);

    embed.fields[0] = {"name": "Inventory", "value": ""}

    embed.footer.text = items.length + "/30 Slots Used | Worth: " + getValue(items) + " Gold";

    for(i=1;i<=30;i++){
        if(items[i-1]) embed.fields[0].value += Items[items[i-1]].icon;
        else embed.fields[0].value += p.config.emoji.space;
        if(i%10==0) embed.fields[0].value += "\n";
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