const Command = require("../command");

module.exports = new Command({

    cooldown: 1000,

    syntax: {
        id: "798081847266770945",
        name: "test",
        description: "This is a test",
        options: [
            { 
                type: 3, 
                name: 'string', 
                description: 'A string' 
            }
        ]
    },

    execute: async (ctx) => {
        console.log(JSON.stringify(ctx.interaction.data));
    }
});