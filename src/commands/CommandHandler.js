const {readdirSync} = require('fs');
const CommandInterface = require("./commandInterface");

const commands = {};

module.exports = class CommandHandler{

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
	return {
		client: client,
		interaction: interaction,
		user: new client.User(interaction.member.user),
		reply: async (reply) => {
			return await client.rest.createInteractionResponse(interaction, reply);
		},
		send: async (message) => {
			return await client.rest.createMessage(interaction.channel_id, message).then((msg) => new client.Message(msg, client));
		}
	}
}

async function registerCommands(){
	readdirSync("./src/commands/commandList/").forEach(file => {
		const command = require(`./commandList/${file}`);
		if(command instanceof CommandInterface) {commands[command.id] = command;}
	});
}