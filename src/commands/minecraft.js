const Command = require("../../lib/structures/Command");
const {getPlayerData, addHyphens} = require("../utils/minecraftAPI");

module.exports = new Command({

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
		const {interaction, send, member: {user}} = p;
		const data = interaction.data.options[0].options[0];
		
		if(data.name == "username"){
			if(data.value.match(/[a-zA-Z0-9_]{3,16}/g) != data.value){
				send({"content": "Invalid username"});
				return;
			}
		} else {
			if(data.value.length == 32) {data.value = addHyphens(data.value);}
			if(data.value.length != 36){
				send({"content": "Invalid UUID"});
				return;
			}
		}

		let playerData = await getPlayerData(data);
		
		let embed = {
			"embed": {
				"title": playerData.name,
				"description": `\`\`\`properties\nUUID ${playerData.uuid}\`\`\``,
				"color": 13679088,
				"timestamp": new Date(),
				"author": {
					"name": `${user.username}`,
					"icon_url": `${user.avatarURL()}`
				}
			}
		}

		send(embed);
	}
});

