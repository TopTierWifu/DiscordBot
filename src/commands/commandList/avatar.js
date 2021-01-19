const CommandInterface = require("../commandInterface");

module.exports = new CommandInterface({

	id: "800972577203552277",

	cooldown: 30000,

	syntax: {"name": "avatar", "description": "Displays a Discord user's information",
		"options": [
			{
				"name": "user",
				"description": "Displays a Discord user's information from a user mention",
				"type": 1,
				"options": [
					{
						"name": "user",
						"description": "The mention of the user",
						"type": 6,
						"required": true
					}
				]
			},
			{
				"name": "id",
				"description": "Displays a Discord user's information from an ID",
				"type": 1,
				"options": [
					{
						"name": "id",
						"description": "The ID of the user",
						"type": 3,
						"required": true
					}
				]
			}
		]
	},
	
	execute: async function(p){
		const {interaction: {data : {options : [{options: [{value: id}]}]}}} = p;
		console.log(id);
	}
});

