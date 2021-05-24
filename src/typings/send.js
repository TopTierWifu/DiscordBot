/**
 * @typedef {import("./eris").Embed} Embed
 * @typedef {import("./eris").AllowedMentions} AllowedMentions
 */

/**
 * @typedef {import("../util/send").InteractionResponse} InteractionResponse
 */

/**
 * @typedef {object} InteractionResponseData
 * @prop {string} [content]
 * @prop {Embed[]} [embeds]
 * @prop {AllowedMentions} [allowed_mentions]
 * @prop {boolean} [ephemeral] Removed flags field and replaced it with ephemeral for now. Set flags to 64 if true
 */

/**
 * @typedef {object} EditWebhookFile 
 * @prop {Buffer} options.file.file A buffer containing file data
 * @prop {String} options.file.name What to name the file 
 */

/**
 * @typedef {object} EditWebhookOptions Webhook message edit options
 * @prop {AllowedMentions} [options.allowedMentions] A list of mentions to allow (overrides default)
 * @prop {String} [options.content] A content string
 * @prop {Embed[]} [options.embeds] An array of Discord embeds
 * @prop {EditWebhookFile | Array<EditWebhookFile>} [options.file] A file object (or an Array of them)
 */

export {};