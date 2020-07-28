module.exports = class CommandInterface{

	constructor(args){
    this.alias = args.alias;
    this.usage = args.usage;
    this.desc = args.desc;
    this.examples = args.examples;
    this.category = args.category;
	this.executeCommand = args.execute;
    }

    async execute(param){
        //This is where perm/nfsw checks go
        await this.executeCommand(param);
	}
}