module.exports = class CommandInterface{

	constructor(args){
    this.category = args.category;
		this.executeCommand = args.execute;
    }

    async execute(args){
        await this.executeCommand(args);
	}
}