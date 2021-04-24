/**
 * @typedef ctx
 * @prop {object} guild
 * @prop {object} member
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
    const { guild_id, channel_id, member: { user: { id } } } = interaction;
    const guild = base.bot.guilds.get(guild_id);
    const member = guild.members.get(id);

    return {
        guild,
        member
    }
}