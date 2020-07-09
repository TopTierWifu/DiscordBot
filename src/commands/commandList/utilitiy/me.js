const CommandInterface = require("../../CommandInterface");

module.exports = new CommandInterface({
    execute: async function(p){
        p.send("It's you!");
    }
})
