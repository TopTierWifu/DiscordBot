module.exports = class CommandInterface{

	constructor(args){
        this.id = args.id;
        this.cooldown = args.cooldown;
        this.syntax = args.syntax
        this.execute = args.execute;
    }

}