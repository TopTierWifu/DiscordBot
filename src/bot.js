const Base = require("eris-sharder").Base;
const EventHander = require("./events/EventHandler");

module.exports = class DiscordBot extends Base{
    constructor(main){
        super(main);

        //Configuration settings
        this.config = require("../config.json");
        this.prefix = this.config.prefix;
    }

    launch(){
        //Setting up all the listeners
        this.eventHandler = new EventHander(this);
    }
}