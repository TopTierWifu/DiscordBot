const Command = require("../command");

module.exports = new Command({

    cooldown: 1000,

    syntax: {
        id: "838249101669564437",
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
        const id = ctx.interaction.data?.options?.[0]?.value;
        const member = id ? ctx.guild.members.get(id) : ctx.member;
        const user = member?.user ?? await ctx.get.user(id);

        if (!user) { ctx.respond(`I can't find that user...`); return; }

        const createdAt = ctx.format.fullDatetime(user.createdAt);
        let color, joinedAt, roles;

        if (member) {
            roles = `__**Roles**__ **[${member.roles.length}]**\n`;

            for (const role of member.roles) {
                roles += ctx.guild.roles.get(role).mention + " ";
            }

            color = ctx.get.memberColor(member);
            joinedAt = ctx.format.fullDatetime(member.joinedAt);
        }

        ctx.respond({
            embeds: [
                {
                    author: {
                        name: `${user.username}#${user.discriminator}`,
                        icon_url: user.avatarURL
                    },
                    description: `${member?.roles?.length ? `${roles}\n` : ""}` +
                        `\`\`\`properties\n` +
                        `Registered ${createdAt}\n` +
                        `${joinedAt ? `Joined ${joinedAt}\n` : ""}` +
                        `ID ${user.id}\n` +
                        `${color ? `Color #${color.toString(16)}\n` : ""}` +
                        `${member?.nick ? `Nickname ${member.nick}\n` : ""}` +
                        `${member?.status ? `Status ${member.status}\n` : ""}` +
                        `\`\`\`` +
                        `\n${user.mention}`,
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