/**
 * @typedef {import("../typings/bot").Main} Main
 * @typedef {import("../typings/send").InteractionResponseData} InteractionResponseData
 * @typedef {import("../typings/send").EditWebhookOptions} EditWebhookOptions
 * @typedef {import("../typings/eris").WebhookPayload} WebhookPayload
 * @typedef {import("../typings/interaction").Interaction} Interaction
 */

class Send {
    /**
     * @param {Main} base 
     */
    constructor(base) {
        /**@private */
        this.base = base;
    }

    /**
     * @param {Interaction} interaction 
     */
    async thinking(interaction) {
        await this.base.requestREST(`/interactions/${interaction.id}/${interaction.token}/callback`, "POST", {
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

class InteractionResponse {
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

    /**
     * @param {EditWebhookOptions} data 
     */
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

module.exports = {
    Send,
    InteractionResponse
}