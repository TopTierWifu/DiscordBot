module.exports = class CommandInterface{

	constructor(args){
		this.executeCommand = args.execute;
    }

    async execute(args){
        await this.executeCommand(args);
	}
}