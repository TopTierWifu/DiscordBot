const Command = require("../../lib/structures/Command");
const N = "\n"
const B = "\`\`\`"

module.exports = new Command({

	id: "802997298673877043",

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
		const {member, presence, send, interaction: {data : {options : [{options: [{value: id}]}]}}} = p;
		const {user, joinedAtFullTimeStamp, roles, nick} = member;
		const {username, discriminator, createdAtFullTimeStamp} = user;
		const {status} = presence;

		let color = 0, position = 0, orderedRoles = [];
		let text = `__**Roles**__ **[${roles.size}]**${N}`;

		roles.forEach((role) => {
			orderedRoles[role.position] = role;
			if((role.position > position) && role.color) {
				color = role.color;
				position = role.position;
			}
		});

		orderedRoles.reverse().forEach((value) => {
			if(value){
				text += value;
			}
		});
		
		let embed = {
			author: {
				name: `${username}#${discriminator}`,
				icon_url: user.avatarURL(1024)
			},
			description: `${text}${N}` +
				`${B}properties${N}` +
				`Registered ${createdAtFullTimeStamp}${N}` +
				`Joined ${joinedAtFullTimeStamp}${N}` +
				`ID ${id}${N}` +
				`Nickname ${nick ? nick : username}${N}` +
				`Status ${status}${N}` +
				`${B}`,
			image: {
				url: user.avatarURL(1024)
			},
			timestamp: new Date(),
			color: color
		}

		send({embed});
	}
});

