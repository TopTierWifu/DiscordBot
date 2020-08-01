const CommandInterface = require("../../commandInterface");

module.exports = new CommandInterface({

    alias:["gather", "g"],

    usage: "",

    desc: "Look around and find resources from the environment",

    examples: ["gather"],

    category: "Exploration",

    execute: async function(p){
        let pf = await p.db.User.findById(p.sender.id) ?? await p.db.User.create({_id: p.sender.id});
        p.send("This command is a WIP...");
    }
});