const Base = require("eris-sharder").Base;
const fetch = require("node-fetch").default;

module.exports = class Bot extends Base {
    /**
     * 
     * @param {import("eris").Client} bot 
     */
    constructor(bot) {
        super(bot);

        /**@type {import("eris").Client} */
        this.bot;

        /**
         * Typed rest request function (mainly for interaction responses)
         * @param {string} route 
         * @param {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} [method] 
         * @param {*} [body] 
         */
        this.requestREST = async (route, method = "GET", body) => {
            return fetch(`https://discord.com/api/v8${route}`, {
                method, 
                body, 
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: this.bot.token
                }
            }).then(async res => {
                try {
                    return await res.json();
                } catch (error) {
                    return res;
                }
            });
        }

        //Util classes
        this.slashCommand = new (require("./util/slashCommand"))(this);
    }

    launch() {
        new (require("../index"))(this).execute();
    }
}