const CommandInterface = require("../../commandInterface");
const ItemUtil = require("../util/itemUtil");

module.exports = new CommandInterface({

    alias:["additem"],

    desc: "Add an item to a player's inventory",
    
    execute: async function(p){
        if(p.args[0] && p.args[1]) ItemUtil.addItem(p, p.args[0], p.args[1]);
        else p.warn("Please specify an item & quality");
    }
});