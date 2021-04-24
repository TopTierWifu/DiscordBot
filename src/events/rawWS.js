const interactionHandler = require("./interactionCreate");

/**
 * Since Eris isn't handling interactions at the moment, will have to make do with raw packets
 * @arg {object} packet
 * @arg {string} [packet.t]
 * @arg {object} packet.d
 * @param {number} id 
 * @this {import("../bot")}
 */
exports.handle = function(packet, id) {
    if (packet.t != "INTERACTION_CREATE") { return; }

    interactionHandler.handle(this, packet.d);
}