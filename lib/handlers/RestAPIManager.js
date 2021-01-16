const fetch = require("node-fetch");
const {ENDPOINTS} = require("../constants");

module.exports = class RestAPIManager{

    constructor(client) {
        this.token = client.token;
        this.headers = {"Content-Type": 'application/json', "Authorization": `Bot ${this.token}`};
    }

    async GET(url){
        return await (await fetch(url, {
            headers: this.headers
        })).json();
    }

    async POST(url, body){
        return await fetch(url, {
            method: `POST`,
            body: body,
            headers: this.headers
        });
    }

    async getUser(id){
        return await this.GET(ENDPOINTS.GET_USER(id), {headers: this.headers});
    }

    async createInteractionResponse(interaction_id, interaction_token, interaction_response){
        return await this.POST(ENDPOINTS.CREATE_INTERACTION_RESPONSE(interaction_id, interaction_token), JSON.stringify(interaction_response));
    }

    

}