const CommandInterface = require("../../commandInterface");
const DIE = require("../../commandList/utils/dieUtil");

module.exports = new CommandInterface({

    alias:["roll", "r"],

    desc: "Fight creatures, find loot, and level up",

    category: "Exploration",

    execute: async function(p){
        let pf = await p.getDoc("Profile");
        if(p.args[0] && pf.items.includes(p.args[0])){
            let result = await DIE.roll(await p.db.Item.findById(p.args[0]));
            p.send("You rolled a " + result);
            return;
        }
        p.warn("Please choose a die you own to roll");
    }
});