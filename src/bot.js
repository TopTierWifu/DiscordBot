const Base = require("eris-sharder").Base;
const EventHander = require("./events/EventHandler");

module.exports = class DiscordBot extends Base{
    constructor(main){
        super(main);

        //MongoDB
        this.mongoose = require('mongoose');
        this.mongoose.database = require("./utils/mongoose")

        //Configuration settings
        this.config = require("../config.json");
        this.prefix = this.config.prefix;
    }

    async launch(){
        //Setting up all the listeners
        this.eventHandler = new EventHander(this);

        //Trying to connect to Database
        await this.mongoose.database.init(this.config.dpass);
    }
}