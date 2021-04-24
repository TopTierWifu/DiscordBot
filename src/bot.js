const Base = require("eris-sharder").Base;

module.exports = class Bot extends Base {
    constructor(bot){
        super(bot);

        this.eventHandler = new (require("./events/eventHandler"))(this);

        /**@type Map<`${bigint}`, import("./commands/command")> */
        this.commands = new Map();
        this.commandHandler = new (require("./commands/commandHandler"))(this);
    }

    launch(){

    }
}