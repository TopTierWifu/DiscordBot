const CommandInterface = require("../../commandInterface");
const ITEM_UTIL = require("../utils/itemUtil");

module.exports = new CommandInterface({

    alias:["inventory", "inv"],

    desc: "View your items",

    category: "User",
    
    execute: async function(p){
        let pf = await p.getDoc("Profile");

        let msg = "**" + p.sender.username + "'s Inventory**"

        for(index in pf.items){
            msg += "\n" + await ITEM_UTIL.getItemPreview(p, pf.items[index]);
        }

        p.send(msg);
    }
});