const nodeFetch = require("node-fetch");
const {ENDPOINTS} = require("../constants");

module.exports = class RestAPIManager{

    constructor(client) {
        this.token = client.token;
        this.headers = {"Content-Type": 'application/json', "Authorization": `Bot ${this.token}`};
    }

    async fetch(endpoint, body){

        let options = {
            method: endpoint.method ? endpoint.method : `GET`,
            body: body ? body : null,
            headers: this.headers
        }

        let response = await nodeFetch(endpoint.url, options);

        try {
            return await response.json();
        } catch (e) {
            return response;
        }
    }

    async getUser(id){
        return await this.fetch(ENDPOINTS.GET_USER(id), {headers: this.headers});
    }

    async createInteractionResponse(interaction_id, interaction_token, interaction_response){
        return await this.fetch(ENDPOINTS.CREATE_INTERACTION_RESPONSE(interaction_id, interaction_token), JSON.stringify(interaction_response));
    }

    async createMessage(channel_id, message){
        return await this.fetch(ENDPOINTS.CREATE_MESSAGE(channel_id), JSON.stringify(message));
    }

    async deleteMessage(channel_id, message_id){
        return await this.fetch(ENDPOINTS.DELETE_MESSAGE(channel_id, message_id));
    }

    async editMessage(channel_id, message_id, message){
        return await this.fetch(ENDPOINTS.EDIT_MESSAGE(channel_id, message_id), JSON.stringify(message));
    }

}