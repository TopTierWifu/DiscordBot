const Command = require("../command");

module.exports = new Command({
    
    id: "802997298673877043",

    cooldown: 1000,

    syntax: {"name": "avatar", "description": "Displays a Discord user's information",
        "options": [
            {
                "name": "user",
                "description": "Displays a Discord user's information from a user mention",
                "type": 1,
                "options": [
                    {
                        "name": "user",
                        "description": "The mention of the user",
                        "type": 6,
                        "required": true
                    }
                ]
            },
            {
                "name": "id",
                "description": "Displays a Discord user's information from an ID",
                "type": 1,
                "options": [
                    {
                        "name": "id",
                        "description": "The ID of the user",
                        "type": 3,
                        "required": true
                    }
                ]
            }
        ]
    },

    execute: async (ctx) => {
        //Normal Message
        const res = await ctx.send("Normal Message");

        const interval = 1000;

        //Message with Embed
        setTimeout(async () => {
            await res.edit({
                content: "Message with embed",
                embeds: [{
                    title: "Embed",
                    description: "Message with embed"
                }]
            });
        }, 1 * interval);

        //Only Embed
        setTimeout(async () => {
            await res.edit({
                content: "",
                embeds: [{
                    title: "Embed",
                    description: "Only embed"
                }]
            });
        }, 2 * interval);

        //Normal Message
        setTimeout(async () => {
            await res.edit({
                content: "Normal Message",
                embeds: []
            });
        }, 3 * interval);

        //Normal Message
        setTimeout(async () => {
            await res.edit({
                content: "Allowed Mentions Test <@210177401064390658> <= Should be nullified",
                allowedMentions: {
                    users: false
                }
            });
        }, 4 * interval);

        //Normal Message
        setTimeout(async () => {
            await res.edit({
                content: "Allowed Mentions Test <@210177401064390658> <= Should be a normal mention"
            });
        }, 5 * interval);

        //Normal Message
        setTimeout(async () => {
            await res.edit({
                content: "Allowed Mentions Test @everyone <= Should be nullified"
            });
        }, 6 * interval);

        //Followup
        setTimeout(async () => {
            const followup = await ctx.followup({
                content: "Followup"
            });
            //Followup Edited
            setTimeout(async () => {
                await followup.edit({
                    content: "Followup Edited"
                });
            }, interval);
        }, 7 * interval);
    }
});