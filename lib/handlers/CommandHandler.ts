import { readdirSync } from "fs";
import { CommandInterface as Command } from "../structures/Command";

import { Client } from "../client";
import { Message } from "../structures/Message";

const commands: any = {};

export class CommandHandler{

	client: Client;

	constructor(client: Client){
		this.client = client;
		registerCommands();
	}
	
	async executeCheck(interaction: any){
		const {data} = interaction;
		const {id}: {id: string} = data

		if(!commands[id]) return;
		
		let params = getParams(this.client, interaction);

        await commands[id].execute(params);
	}

}

function getParams(client: Client, interaction: any){
	const {guild_id, channel_id, member: {user: {id}}} = interaction;
	
	const guild = client.guilds.get(guild_id);
	const {members, presences} = guild;

	return {
		client: client,
		interaction: interaction,
		member: members.get(id),
		presence: presences.get(id),
		reply: async (reply: any) => {
			return await client.rest.createInteractionResponse(interaction, reply);
		},
		send: async (message: any) => {
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