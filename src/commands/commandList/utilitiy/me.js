const CommandInterface = require("../../CommandInterface");

module.exports = new CommandInterface({

    arguments:"",
  
    description: "The one and only, you!",
  
    examples: ["me"],

    category: "Utility",

    execute: async function(p){
        p.send("It's you!");
    }
})
