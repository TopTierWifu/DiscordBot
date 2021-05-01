const Eris = require("eris");
const Command = require("../commands/command");
const dir = require("fs").readdirSync("./src/commands/commandList").map(filename => filename.slice(0, -3));

/**
 * @typedef {import("../bot")} Base
 * @typedef {import("../events/interactionCreate").Interaction} Interaction
 * @typedef {Eris.Guild} Guild
 * @typedef {Eris.Member} Member
 * @typedef {Eris.WebhookPayload} WebhookPayload
 * @typedef {Omit<Eris.Embed, "type">} Embed
 */

/**
 * @typedef ctx
 * @prop {Eris.Client} bot
 * @prop {Interaction} interaction
 * @prop {Guild} guild
 * @prop {Member} member
 * @prop {(response: InteractionResponse | string)=>Promise<Response>} reply
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

        await command.execute(context);
    }
}

/**
 * @arg {Base} base 
 * @arg {Interaction} interaction 
 * @returns {ctx}
 */
function getContext(base, interaction) {
    const { guild_id, channel_id, member: { user: { id } }, token } = interaction;
    const application_id = base.bot.user.id;
    const guild = base.bot.guilds.get(guild_id);
    const member = guild.members.get(id);

    return {
        bot: base.bot,
        interaction,
        guild,
        member,
        /**
         * Can only use this once per command
         * @arg {InteractionResponse | string} response 
         */
        reply: async (response) => {
            if (typeof response !== "object") {
                response = {
                    defer: false,
                    content: "" + response
                }
            }

            await base.requestREST("POST", `/interactions/${interaction.id}/${interaction.token}/callback`, {
                type: response.defer ? 5 : 4,
                data: {
                    tts: response.tts,
                    content: response.content,
                    embeds: response.embeds,
                    allowed_mentions: base.bot.options.allowedMentions,
                    flags: response.ephemeral ? 64 : undefined
                }
            });
            return new Response(base, token);
        },
        /**@arg {WebhookPayload} message */
        followup: async (message) => {
            return await base.bot.executeWebhook(application_id, token, {
                ...message,
                wait: true
            });
        },
        get: base.get,
        format: base.format
    }
}

/**
 * @typedef {object} InteractionResponse
 * @prop {boolean} [defer] Removed type field and replaced it with defer for now. Defer: 5 & No Defer: 4
 * @prop {boolean} [tts] 
 * @prop {string} [content]
 * @prop {Embed[]} [embeds]
 * @prop {Eris.AllowedMentions} [allowed_mentions]
 * @prop {boolean} [ephemeral] Removed flags field and replaced it with ephemeral for now. Set flags to 64 if true
 */

/**
 * @class Response
 */
class Response {
    /**
     * @arg {Base} base 
     * @arg {string} interaction_token 
     */
    constructor(base, interaction_token) {
        /**@private */
        this.base = base;
        /**@private */
        this.bot_id = base.bot.user.id;
        /**@private */
        this.interaction_token = interaction_token;
    }

    /**
     * @typedef {object} EditWebhookFile 
     * @prop {Buffer} options.file.file A buffer containing file data
     * @prop {String} options.file.name What to name the file 
     */

    /**
     * @typedef {object} EditWebhookOptions Webhook message edit options
     * @prop {Eris.AllowedMentions} [options.allowedMentions] A list of mentions to allow (overrides default)
     * @prop {String} [options.content] A content string
     * @prop {Embed[]} [options.embeds] An array of Discord embeds
     * @prop {EditWebhookFile | Array<EditWebhookFile>} [options.file] A file object (or an Array of them)
     * 
     */

    /**
     * @param {EditWebhookOptions} data 
     */
    async edit(data) {
        await this.base.requestREST("PATCH", `/webhooks/${this.bot_id}/${this.interaction_token}/messages/@original`, {
            ...data,
            // @ts-ignore
            ...{allowed_mentions: data.allowedMentions ? this.base.bot._formatAllowedMentions(data.allowedMentions) : this.base.bot.options.allowedMentions}
        });
        return this;
    }

    async delete() {
        await this.base.requestREST("DELETE", `/webhooks/${this.bot_id}/${this.interaction_token}/messages/@original`);
    }

}