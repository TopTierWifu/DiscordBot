const CommandInterface = require("../../commandInterface");
const InvUtil = require("../util/inventoryUtil");

module.exports = new CommandInterface({

    alias:["addresource","addinv"],

    desc: "Add an item to a player's inventory",
    
    execute: async function(p){
        if(p.args[0] && p.args[1]) InvUtil.addItem(p, p.args[0], p.args[1]);
        else p.warn("Please specify an item & amount");
    }
});