const fetch = require("node-fetch");
const {ENDPOINTS} = require("../constants");

module.exports = class RestAPIManager{

    constructor(client) {
        this.token = client.token;
    }

    async GET(url){
        return await (await fetch(url, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bot ${this.token}`
            }
        })).json();
    }

    async POST(url, body){
        fetch(url, {
            method: `POST`,
            body: body,
            headers: {"Content-Type": 'application/json', "Authorization": `Bot ${this.token}`}
        });
    }

    async getUser(id){
        return await this.GET(ENDPOINTS.GET_USER(id), this.headersGET);
    }

    async createInteractionResponse(interaction_id, interaction_token, interaction_response){
        this.POST(ENDPOINTS.CREATE_INTERACTION_RESPONSE(interaction_id, interaction_token), interaction_response);
    }

    async createFollowupMessage(interaction_token, followup_message){
        this.POST(ENDPOINTS.CREATE_INTERACTION_RESPONSE(ENDPOINTS.CREATE_FOLLOWUP_MESSAGE(this.token, interaction_token)), followup_message);
    }

}