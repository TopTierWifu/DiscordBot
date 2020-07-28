const Base = require("eris-sharder").Base;

module.exports = class Wifu extends Base{
    constructor(main){
        super(main);

        //Database models
        this.db = new (require("./utils/mongoose"))();

        //Config file
        this.config = require("./data/config.json");
        this.prefix = this.config.prefix;

        //Command Handler
        this.commandHandler = new (require("./commands/commandHandler"))(this);
    }

    async launch(){
        //Register events
        this.eventHandler = new (require("./events/EventHandler"))(this);
    }
};