const Eris = require("eris");
const Command = require("../commands/command");
const dir = require("fs").readdirSync("./src/commands/commandList").map(filename => filename.slice(0, -3));

/**
 * @typedef {import("../bot")} Base
 * @typedef {import("../events/interactionCreate").Interaction} Interaction
 * @typedef {import("../util/send").InteractionResponseData} InteractionResponseData
 * @typedef {import("../util/send").InteractionResponse} InteractionResponse
 * @typedef {Eris.WebhookPayload} WebhookPayload
 */

/**
 * @typedef ctx
 * @prop {Eris.Client} bot
 * @prop {Interaction} interaction
 * @prop {Eris.Guild} guild
 * @prop {Eris.Member} member
 * @prop {(response: InteractionResponseData | String)=>Promise<InteractionResponse>} respond
 * @prop {(message: WebhookPayload)=>Promise<Eris.Message<Eris.TextableChannel>>} followup
 * @prop {import("../util/get")} get
 * @prop {import("../util/format")} format
 */

/**
 * @class CommandHandler
 */
module.exports = class CommandHandler {
    /**
     * @arg {Base} base 
     */
    constructor(base) {
        this.base = base;

        for (let file of dir) {
            //Change this later when commandsList has subdirectories
            const command = require(`./commandList/${file}.js`);
            if (command instanceof Command) {
                this.base.commands.set(command.id, command);
            }
        }
    }

    /**
     * @arg {Interaction} interaction 
     */
    async executeCommand(interaction) {
        const { data: { id } } = interaction;
        const command = this.base.commands.get(id);

        //Check if command exists
        if (!command) return;

        const context = getContext(this.base, interaction);

        try {
            await this.base.send.thinking(interaction);
            await command.execute(context);
        } catch (error) {
            console.error(error);
        }
    }
}

/**
 * @arg {Base} base 
 * @arg {Interaction} interaction 
 * @returns {ctx}
 */
function getContext(base, interaction) {
    const { guild_id, member: { user: { id } } } = interaction;
    const guild = base.bot.guilds.get(guild_id);
    const member = guild.members.get(id);

    return {
        bot: base.bot,
        interaction,
        guild,
        member,
        /**
         * Can only use this once per command
         * @arg {InteractionResponseData | string} response 
         */
        respond: async (response) => base.send.respond(interaction, response),
        /**@arg {WebhookPayload} message */
        followup: async (message) => base.send.followup(interaction, message),
        get: base.get,
        format: base.format
    }
}