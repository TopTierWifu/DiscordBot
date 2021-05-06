const Eris = require("eris");

/**
 * @typedef {Omit<Eris.Embed, "type">} Embed
 * @typedef {import("../commands/commandHandler").Base} Base
 * @typedef {import("../commands/commandHandler").Interaction} Interaction
 * @typedef {Eris.WebhookPayload} WebhookPayload
 */

/**
 * @typedef {object} InteractionResponseData
 * @prop {string} [content]
 * @prop {Embed[]} [embeds]
 * @prop {Eris.AllowedMentions} [allowed_mentions]
 * @prop {boolean} [ephemeral] Removed flags field and replaced it with ephemeral for now. Set flags to 64 if true
 */

class Send {
    /**
     * @param {import("../bot")} base 
     */
    constructor(base) {
        /**@private */
        this.base = base;
    }

    /**
     * @param {Interaction} interaction 
     */
    async thinking(interaction) {
        await this.base.requestREST("POST", `/interactions/${interaction.id}/${interaction.token}/callback`, {
            type: 5
        });
    }

    /**
     * @param {Interaction} interaction
     * @param {InteractionResponseData | string} response 
     */
    async respond(interaction, response) {
        if (typeof response !== "object") {
            response = {
                content: "" + response
            }
        }

        return new InteractionResponse(this.base, interaction.token).edit(response);
    }

    /**
     * @param {Interaction} interaction 
     * @param {WebhookPayload} message 
     */
    async followup(interaction, message) {
        return await this.base.bot.executeWebhook(this.base.bot.user.id, interaction.token, {
            ...message,
            wait: true
        });
    }
}

/**
 * @class Response
 */
class InteractionResponse {
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
            ...{ allowed_mentions: data.allowedMentions ? this.base.bot._formatAllowedMentions(data.allowedMentions) : this.base.bot.options.allowedMentions }
        });
        return this;
    }

    async delete() {
        await this.base.requestREST("DELETE", `/webhooks/${this.bot_id}/${this.interaction_token}/messages/@original`);
    }

}

module.exports = {
    Send,
    InteractionResponse
}