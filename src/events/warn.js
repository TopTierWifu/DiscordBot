/**
 * @arg {string} message 
 * @arg {number} id 
 */
exports.handle = (message, id) => {
    if (message.startsWith("Unhandled MESSAGE_CREATE type")) { return; }
    process.send({ name: "warn", msg: `Shard ${id} | ${message}` });
}