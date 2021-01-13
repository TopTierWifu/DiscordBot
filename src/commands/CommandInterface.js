module.exports = class CommandInterface{

	constructor(args){
        this.id = args.id;
        this.cooldown = args.cooldown;
        this.execute = args.execute;
    }

}