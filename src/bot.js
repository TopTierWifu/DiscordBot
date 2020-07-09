const Base = require("eris-sharder").Base;
const EventHander = require("./events/EventHandler");

module.exports = class DiscordBot extends Base{
    constructor(bot){
        super(bot);

        this.config = require("../config.json");
        this.prefix = this.config.prefix;
    }

    launch(){
        this.eventHandler = new EventHander(this);
    }
}