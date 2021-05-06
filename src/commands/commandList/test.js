const Command = require("../command");

module.exports = new Command({

    cooldown: 1000,

    syntax: {
        id: "838261981815373865",
        name: "test",
        description: "Find the sell/sacrifice value of your zoo. Note that all referenced messages must be successive.",
        options: [
            {
                type: 3,
                name: 'messageID',
                description: 'The message ID of the owo zoo command',
                required: true
            },
            {
                type: 4,
                name: 'zooLength',
                description: "The number of messages long the zoo is",
                required: true
            }

        ]
    },

    execute: async (ctx) => {

        ctx.respond("test");

        // console.log(JSON.stringify(ctx.interaction.data));
        // const messages = await ctx.bot.getMessages("732802024097447976", 5, "838282699852611594");

        // for(const message of messages) {
        //     console.log(ctx.format.fullDatetime(message.createdAt));
        // }
    }
});