const CommandInterface = require("../commandInterface");

module.exports = new CommandInterface({

	id: "798753895126925333",

	cooldown: 30000,
	
	execute: async function(data){
        console.log(data);
	}
});