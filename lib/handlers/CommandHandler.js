const Message = require("../structures/Message");
/**
 * Handles all incomming Interaction Create events
 * @prop {Client} client The Client
 */
class CommandHandler{
	constructor(client){
		this.client = client;
	}
	
	/**
	 * Checks if a command can be executed based on Interaction Create event 
	 * @param {Object} interaction Interaction Create event data
	 */
	async executeCheck(interaction){
		const {data} = interaction;
		const {id} = data

		if(!this.client.commands.get(id)) return;
		
		let params = getParams(this.client, interaction);

        await this.client.commands.get(id).execute(params);
	}

}

function getParams(client, interaction){
	const {guild_id, channel_id, member: {user: {id}}} = interaction;
	
	const guild = client.guilds.get(guild_id);
	const {members, presences} = guild;

	return {
		client: client,
		interaction: interaction,
		guild: guild,
		member: members.get(id),
		presence: presences.get(id),
		reply: async (reply) => {
			return await client.createInteractionResponse(interaction, reply);
		},
		send: async (message) => {
			return await client.createMessage(channel_id, message).then((msg) => new Message(msg, client));
		}
	}
}

module.exports = CommandHandler;