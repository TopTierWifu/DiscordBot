/**
 * @typedef {import("../typings/bot").Main} Main
 * @typedef {import("../typings/send").InteractionResponseData} InteractionResponseData
 * @typedef {import("../typings/send").EditWebhookOptions} EditWebhookOptions
 * @typedef {import("../typings/eris").WebhookPayload} WebhookPayload
 * @typedef {import("../typings/interaction").Interaction} Interaction
 */

/**@type {Main} */
let BASE;

/**@arg {Main} base */
exports.init = (base) => {
    BASE = base;
}

/**@arg {Interaction} interaction */
exports.thinking = async (interaction) => {
    await BASE.requestREST(`/interactions/${interaction.id}/${interaction.token}/callback`, "POST", {
        type: 5
    });
}

/**
 * @arg {Interaction} interaction
 * @arg {InteractionResponseData | string} response 
 */
exports.respond = async (interaction, response) => {
    if (typeof response !== "object") {
        response = {
            content: "" + response
        }
    }

    return new exports.InteractionResponse(BASE, interaction.token).edit(response);
}

/**
 * @arg {Interaction} interaction 
 * @arg {WebhookPayload} message 
 */
exports.followup = async (interaction, message) => {
    return await BASE.bot.executeWebhook(BASE.bot.user.id, interaction.token, {
        ...message,
        wait: true
    });
}

exports.InteractionResponse = class {
    /**
     * @arg {Main} base 
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

    /**@arg {EditWebhookOptions} data */
    async edit(data) {
        await this.base.requestREST(`/webhooks/${this.bot_id}/${this.interaction_token}/messages/@original`, "PATCH", {
            ...data,
            // @ts-ignore
            ...{ allowed_mentions: data.allowedMentions ? this.base.bot._formatAllowedMentions(data.allowedMentions) : this.base.bot.options.allowedMentions }
        });
        return this;
    }

    async delete() {
        await this.base.requestREST(`/webhooks/${this.bot_id}/${this.interaction_token}/messages/@original`, "DELETE");
    }

}