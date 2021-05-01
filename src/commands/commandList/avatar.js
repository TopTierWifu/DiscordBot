const Command = require("../command");

module.exports = new Command({

    cooldown: 1000,

    syntax: {
        id: "838125469387194438",
        name: "avatar",
        description: "Displays a Discord user's information",
        options: [
            {
                name: "user",
                description: "The user, can be an ID",
                type: 6,
                required: false
            }
        ]
    },

    execute: async (ctx) => {
        const { guild, interaction: { data: { options: [{ options: [{ value: id }] }] } } } = ctx;

        const member = guild.members.get(id);
        const user = member?.user ?? await ctx.get.user(id);

        if (!user) { ctx.reply(`I can't find that user...`); return; }

        const createdAt = ctx.format.fullDatetime(user.createdAt);
        let color, joinedAt, text;

        if (member) {
            text = member.roles.length ? `__**Roles**__ **[${member.roles.length}]**\n` : "";

            for (const role of member.roles) {
                text += guild.roles.get(role).mention + " ";
            }

            color = ctx.get.memberColor(member);
            joinedAt = ctx.format.fullDatetime(member.joinedAt);
        }

        ctx.reply({
            embeds: [
                {
                    author: {
                        name: `${user.username}#${user.discriminator}`,
                        icon_url: user.avatarURL
                    },
                    description: `${text ? `${text}\n` : ""}` +
                        `\`\`\`properties\n` +
                        `Registered ${createdAt}\n` +
                        `${joinedAt ? `Joined ${joinedAt}\n` : ""}` +
                        `ID ${id}$\n` +
                        `${color ? `Color #${color.toString(16)}\n` : ""}` +
                        `${member?.nick ? `Nickname ${member.nick}\n` : ""}` +
                        `${member?.status ? `Status ${member.status}\n` : ""}` +
                        `\`\`\``,
                    image: {
                        url: user.avatarURL
                    },
                    timestamp: new Date(),
                    color
                }
            ]
        });
    }
});