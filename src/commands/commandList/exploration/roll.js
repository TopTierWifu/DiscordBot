const CommandInterface = require("../../commandInterface");
const DIE = require("../../commandList/utils/dieUtil");

module.exports = new CommandInterface({

    alias:["roll", "r"],

    desc: "Fight creatures, find loot, and level up",

    category: "Exploration",

    execute: async function(p){
        //let pf = await p.getDoc("Profile");

        msg = p.send(":game_die:");
    }
});