/**
 * @typedef ctx
 * @prop {import("eris").Guild} guild
 * @prop {import("eris").Member} member
 * @prop {()=>Promise<void>} send
 */

const Command = require("../commands/command");
const dir = require("fs").readdirSync("./src/commands/commandList").map(filename => filename.slice(0, -3));

module.exports = class CommandHandler {
    /**
     * @param {import("../bot")} base 
     */
    constructor(base) {
        this.base = base;

        for (let file of dir) {
            //Change this later when commandsList has subdirectories
            const command = require(`./commandList/${file}.js`);
            if(command instanceof Command){
                this.base.commands.set(command.id, command);
            }
        }
    }

    /**
     * @param {import("../events/interactionCreate").Interaction} interaction 
     */
    async executeCommand(interaction) {
        const { data: { id } } = interaction;
        const command = this.base.commands.get(id);

        //Check if command exists
        if (!command) return;

        const context = getContext(this.base, interaction);

        await command.execute(context);
    }
}

/**
 * @param {import("../bot")} base 
 * @param {import("../events/interactionCreate").Interaction} interaction 
 * @returns {ctx}
 */
function getContext(base, interaction) {
    const { guild_id, channel_id, member: { user: { id } }, token } = interaction;
    const guild = base.bot.guilds.get(guild_id);
    const member = guild.members.get(id);

    return {
        guild,
        member,
        send: async () => {
            const application_id = base.bot.user.id;
            base.requestREST("POST", `/interactions/${interaction.id}/${interaction.token}/callback`, {
                type: 4, 
                data: {
                    content: "Interaction Response"
                }
            }).then(async () => {
                await base.bot.executeWebhook(application_id, token, {
                    content: "Execute Webhook/Followup Message",
                    embeds: [{
                        title: "Title",
                        description: "Description"
                    }],
                    wait: true,
                });
            });
        }
    }
}