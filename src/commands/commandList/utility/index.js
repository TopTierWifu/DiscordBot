const CommandInterface = require("../../commandInterface");

module.exports = new CommandInterface({

    alias:["index", "i"],

    usage: "{item}",

    desc: "View all the details of items and monsters you have encountered",

    examples: ["index shorts", "index"],

    category: "Utility",

    execute: async function(p){
        p.send("Command is a WIP...")
    }
});