const interactionHandler = require("./interactionCreate");

/**
 * @typedef {import("../typings/bot").Main} Main
 * @typedef {import("../typings/eris").Packet} Packet
 */

/**
 * Since Eris isn't handling interactions at the moment, will have to make do with raw packets
 * @arg {Packet} packet
 * @param {number} id 
 * @this {Main}
 */
exports.handle = function (packet, id) {
    if (packet.t != "INTERACTION_CREATE") { return; }

    interactionHandler.handle(this, packet.d);
}