import nodeFetch from "node-fetch";
import { ENDPOINTS } from "@constants";
import { Client } from "../client";

export class RestAPIManager{

    token: string;
    headers: any;

    constructor(client: Client) {
        this.token = client.token;
        this.headers = {"Content-Type": 'application/json', "Authorization": `Bot ${this.token}`};
    }

    async fetch(endpoint: any, body: any = null){

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

    async getUser(id: string){
        return await this.fetch(ENDPOINTS.GET_USER(id), {headers: this.headers});
    }

    async createInteractionResponse(interaction: any, response: any){
        return await this.fetch(ENDPOINTS.CREATE_INTERACTION_RESPONSE(interaction.id, interaction.token), JSON.stringify(response));
    }

    async createMessage(channel_id: string, message: any){
        return await this.fetch(ENDPOINTS.CREATE_MESSAGE(channel_id), JSON.stringify(message));
    }

    async deleteMessage(channel_id: string, message_id: string){
        return await this.fetch(ENDPOINTS.DELETE_MESSAGE(channel_id, message_id));
    }

    async editMessage(channel_id: string, message_id: string, message: any){
        return await this.fetch(ENDPOINTS.EDIT_MESSAGE(channel_id, message_id), JSON.stringify(message));
    }

}