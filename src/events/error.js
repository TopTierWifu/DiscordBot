/**
 * @param {Error} error 
 * @param {number} id 
 */
 exports.handle = (error, id) => {
    if (error.message.startsWith("Connection reset by peer")) { 
        process.send({ name: "error", msg: `Shard ${id} | Connection reset by peer` });
        return;
    }
    process.send({ name: "error", msg: `Shard ${id} | ${error.stack}` });
}