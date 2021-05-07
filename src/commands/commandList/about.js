const Command = require("../command");

module.exports = new Command({

    cooldown: 1000,

    syntax: {
        id: "840079221060665375",
        name: "about",
        description: "Info about the bot"
    },

    execute: async (ctx) => {
        const { guild, bot } = ctx

        ctx.respond({
            embeds: [
                {
                    author: {
                        name: "Info",
                        icon_url: bot.user.avatarURL
                    },
                    fields: [
                        {
                            name: "Guild Information",
                            value: `\`\`\`properties\n` +
                                `ID ${guild.id}\n` +
                                `Members ${guild.memberCount}\n` +
                                `Created ${ctx.format.fullDatetime(guild.createdAt)}\n` +
                                `Owner ${(await ctx.get.user(guild.ownerID)).username}\n` +
                                `${guild.description ? `Description ${guild.description}\n` : ""}` +
                                `\`\`\``
                        },
                        {
                            name: "Bot Information",
                            value: `\`\`\`properties\n` +
                            `Created ${ctx.format.fullDatetime(ctx.bot.user.createdAt)}\n` +
                            `Added ${ctx.format.fullDatetime(guild.joinedAt)}\n` +
                            `Guilds ${bot.guilds.size}\n` +
                            `Users ${bot.users.size}\n` +
                            `\`\`\`` +
                            `\`\`\`properties\n` +
                            `Uptime ${ctx.format.fullDurationString(bot.uptime)}\n` +
                            `Ping ${guild.shard.latency}ms\n` +
                            `\`\`\``
                        }
                    ],
                    timestamp: new Date(),
                    color: 0xd0b9f0
                }
            ]
        });
    }
});