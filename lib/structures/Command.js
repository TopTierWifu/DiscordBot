const Base = require("./Base");

module.exports = class CommandInterface extends Base{

	constructor(args){
        super(args.id);
        this.cooldown = args.cooldown;
        this.syntax = args.syntax
        this.execute = args.execute;
    }

}