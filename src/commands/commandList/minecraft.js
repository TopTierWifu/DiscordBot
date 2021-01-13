const CommandInterface = require("../commandInterface");
const API = require("../utils/minecraftAPI");

module.exports = new CommandInterface({

	id: "798753895126925333",

	cooldown: 30000,
	
	execute: async function(data){
		let playerData = await API.getPlayerData(data.options[0].value);
		console.log(playerData);
	},

	syntax: {"name": "minecraft", "description": "Get the player data of a Minecraft player",
		"options": [
			{
				"name": "Username-UUID",
				"description": "The username or UUID of the player",
				"type": 3,
				"required": true
			}
		]
	}
});