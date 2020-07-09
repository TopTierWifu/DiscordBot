module.exports = class CommandHandler{

	constructor(bot){
		this.bot = bot;
		this.execute = function(command, msg) {
			console.log("Success");
		}
	}
}