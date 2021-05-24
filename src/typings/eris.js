const Eris = require("eris");
const ErisSharder = require("eris-sharder");

const ErisBase = ErisSharder.Base;

/**
 * @typedef {ErisBase} Base
 */

/**
 * @typedef {Omit<Eris.Embed, "type">} Embed
 * @typedef {Eris.WebhookPayload} WebhookPayload
 * @typedef {Eris.AllowedMentions} AllowedMentions
 * @typedef {Eris.Client} Client
 * @typedef {Eris.Member} Member
 * @typedef {Eris.Guild} Guild
 * @typedef {Eris.Message<Eris.TextableChannel>} Message
 */

/**
 * @typedef {object} Packet
 * @prop {string} [t]
 * @prop {object} d
 */

export {};