const dir = require("fs").readdirSync("./src/events").map(filename => filename.slice(0, -3));

/**
 * @typedef {import("../typings/bot").Main} Main
 */

module.exports = class EventHander {
    /**
     * @param {Main} base 
     */
    constructor(base) {
        let filename = __filename.slice(__dirname.length + 1, -3);
        for (let listnener of dir) {
            if (listnener != filename) {
                base.bot.on(listnener, require(`./${listnener}.js`).handle.bind(base));
            }
        }
    }
}