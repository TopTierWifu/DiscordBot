const CommandInterface = require("../../CommandInterface");

module.exports = new CommandInterface({

    category: "Utility",

    execute: async function(p){
        p.send("It's you!");
    }
})
