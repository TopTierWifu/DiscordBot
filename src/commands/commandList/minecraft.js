const CommandInterface = require("../commandInterface");
const API = require("../utils/minecraftAPI");

module.exports = new CommandInterface({

	id: "798753895126925333",

	cooldown: 30000,

	syntax: {"name": "minecraft", "description": "Get the player data of a Minecraft player",
		"options": [
			{
				"name": "username",
				"description": "Get data from the username of the player",
				"type": 1,
				"options": [
					{
						"name": "username",
						"description": "The username of the player",
						"type": 3,
						"required": true
					}
				]
			},
			{
				"name": "uuid",
				"description": "Get data from the UUID of the player",
				"type": 1,
				"options": [
					{
						"name": "uuid",
						"description": "The UUID of the player",
						"type": 3,
						"required": true
					}
				]
			}
		]
	},
	
	execute: async function(p){
		const data = p.options[0].options[0];
		
		if(data.name == "username"){
			if(data.value.match(/[a-zA-Z0-9_]{3,16}/g) != data.value){
				/* Send Error Message*/
				console.log("Invalid username");
				return;
			}
		} else {
			if(data.value.length == 32) {data.value = API.addHyphens(data.value);}
			if(data.value.length != 36){
				/* Send Error Message*/
				console.log("Invalid UUID");
				return;
			}
		}

		let playerData = await API.getPlayerData(data);
		console.log(playerData);
	}
});

