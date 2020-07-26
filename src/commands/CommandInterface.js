module.exports = class CommandInterface{

	constructor(args){
    this.arguments = args.arguments;
    this.description = args.description;
    this.examples = args.examples;
    this.category = args.category;
		this.executeCommand = args.execute;
    }

    async execute(args){
        await this.executeCommand(args);
	}
}