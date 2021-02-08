const {Command} = require("wifu");
const N = "\n"
const B = "\`\`\`"

module.exports = new Command({

	id: "802997298673877043",

	cooldown: 1000,

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
		const {guild, send, interaction: {data : {options : [{options: [{value: id}]}]}}} = p;
		const member = guild.members.get(id);
		const {joinedAtFormatted, roles, nick, hexColor, color, orderedRoles} = member ?? {};
		const user = p.client.users.get(id) ?? p.client.users.add(await p.client.getUser(id));
		const {username, discriminator, createdAtFormatted} = user;

		if(!username){
			send({"content": "A user with that ID does not exist!"});
			return;
		}

		const {status} = p.client.presences.get(id) ?? {};

		let text = roles ? `__**Roles**__ **[${roles.size}]**${N}` : "";

		if(member){
			for(const role of orderedRoles){
				text += role;
			}
		}

		let embed = {
			author: {
				name: `${username}#${discriminator}`,
				icon_url: user.avatarURL(1024)
			},
			description: `${text}${N}` +
				`${B}properties${N}` +
				`Registered ${createdAtFormatted}${N}` +
				`${joinedAtFormatted ? `Joined ${joinedAtFormatted}${N}` : ""}` +
				`ID ${id}${N}` +
				`${hexColor ? `Color #${hexColor}${N}` : ""}` +
				`${nick ? `Nickname ${nick}${N}` : ""}` +
				`${status ? `Status ${status}${N}` : ""}` +
				`${B}`,
			image: {
				url: user.avatarURL(1024)
			},
			timestamp: new Date(),
			color: color ?? 0
		}

		send({embed});
	}
});

