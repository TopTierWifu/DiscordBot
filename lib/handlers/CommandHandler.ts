import { readdirSync } from "fs";
import { CommandInterface as Command } from "../structures/Command";

import { Message } from "../structures/Message";
import { Member } from "../structures/Member";

const commands = {};

export class CommandHandler{

	constructor(client){
		this.client = client;
		registerCommands();
	}
	
	async executeCheck(interaction){
		const {token, member, data, channel_id} = interaction;
		const {id} = data

		if(!commands[id]) return;
		
		let params = getParams(this.client, interaction);

        await commands[id].execute(params);
	}

}

function getParams(client, interaction){
	const {guild_id, channel_id, member: {user: {id}}} = interaction;
	
	const guild = client.guilds.get(guild_id);
	const {members, presences} = guild;

	return {
		client: client,
		interaction: interaction,
		member: members.get(id),
		presence: presences.get(id),
		reply: async (reply) => {
			return await client.rest.createInteractionResponse(interaction, reply);
		},
		send: async (message) => {
			return await client.rest.createMessage(channel_id, message).then((msg) => new Message(msg, client));
		}
	}
}

async function registerCommands(){
	readdirSync("./src/commands/").forEach(file => {
		const command = require(`../../src/commands/${file}`);
		if(command instanceof Command) {commands[command.id] = command;}
	});
}