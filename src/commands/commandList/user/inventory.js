const CommandInterface = require("../../commandInterface");
const ItemUtil = require("../util/itemUtil");

module.exports = new CommandInterface({

    alias:["items"],

    desc: "View the items in your inventory",

    category: "User",
    
    execute: async function(p){
        openInv(p);
    }
});

async function openInv(p){
    let inv = (await p.db.User.findById(p.sender.id, "inv"))?.inv ?? [];

    p.send({embed});
}