/**
 * 
 * @param {string} message 
 * @param {number} id 
 */
exports.handle = (message, id) => {
    if(message.startsWith("Unhandled MESSAGE_CREATE type")) {return;}
    process.send({ name: "warn", msg: `Shard ${id} | ${message}` });
}