// Request
const fetch = require("node-fetch").default;

/**
 * @typedef {Omit<import("../typings/command").ApplicationCommand, "application_id" | "id">} CommandJSON
 * @typedef {import("../typings/command").Command} Command
 * @typedef {import("../typings/command").CommandPermissions} Permissions
 * @typedef {import("../typings/bot").Auth} Auth
 * @typedef {import("../typings/bot").HTTPMethods} HTTPMethods
 */

module.exports = class Commands {
    /**
     * @param {Auth} auth
     */
    constructor(auth){
        this.token = auth.token;
        this.id = auth.id;
    }

    /**
     * @param {string} route 
     * @param {HTTPMethods} [method] 
     * @param {*} [body] 
     */
    async request (route, method = "GET", body) {
        return fetch(`https://discord.com/api/v8${route}`, {
            method, 
            body, 
            headers: { 
                'Content-Type': 'application/json', 
                Authorization: `Bot ${this.token}`
            }
        }).then(async res => {
            try {
                return await res.json();
            } catch (error) {
                return res;
            }
        });
    }

    //Guild Endpoints

    /**
     * @param {string} guildId
     * @param {Command} command
     */
    async createGuild(guildId, command) {
        return await this.request(
            `/applications//${this.id}/guilds/${guildId}/commands`, 
            "POST", 
            this.commandToCommandJsonString(command)
        );
    }

    /**
     * @param {string} guildId
     * @param {Command} command
     */
    async editGuild(guildId, command) {
        return await this.request(
            `/applications/${this.id}/guilds/${guildId}/commands/${command.id}`, 
            "PATCH", 
            this.commandToCommandJsonString(command)
        );
    }

    /**
     * @param {string} commandId 
     * @param {string} guildId
     */
    async deleteGuild(commandId, guildId) {
        return await this.request(`/applications/${this.id}/guilds/${guildId}/commands/${commandId}`, "DELETE");
    }

    /**
     * @param {string} commandId 
     * @param {string} guildId
     */
    async getGuild(commandId, guildId) {
        return await this.request(`/applications/${this.id}/guilds/${guildId}/commands/${commandId}`);
    }

    /**
     * @param {string} guildId 
     */
    async getAllGuild(guildId) {
        return await this.request(`/applications/${this.id}/guilds/${guildId}/commands`);
    }

    /**
     * @param {string} guildId 
     * @param {Command} command
     */
    async getGuildPermissions(guildId, command) {
        return await this.request(`/applications/${this.id}/guilds/${guildId}/commands/${command.id}/permissions`);
    }

    /**
     * @param {string} guildId 
     */
    async getAllGuildPermissions(guildId) {
        return await this.request(`/applications/${this.id}/guilds/${guildId}/commands/permissions`);
    }

    /**
     * @param {string} guildId 
     * @param {Command} command
     */
    async editGuildPermissions(guildId, command) {
        return await this.request(
            `/applications/${this.id}/guilds/${guildId}/commands/${command.id}/permissions`,
            "PUT",
            this.commandToPermissionsJsonString(command)
        );
    }

    //Global Endpoints

    /**
     * @param {Command} command
     */
    async createGlobal(command) {
        return await this.request(
            `/applications/${this.id}/commands`, 
            "POST", 
            this.commandToCommandJsonString(command)
        );
    }

    /**
     * @param {Command} command
     */
    async editGlobal(command) {
        return await this.request(
            `/applications/${this.id}/commands/${command.id}`, 
            "PATCH", 
            this.commandToCommandJsonString(command)
        );
    }

    /**
     * @param {string} commandId 
     */
    async deleteGlobal(commandId){
        return await this.request(`/applications/${this.id}/commands/${commandId}`, "DELETE")
    }

    /**
     * @param {string} commandId 
     */
    async getGlobal(commandId) {
        return await this.request(`/applications/${this.id}/commands/${commandId}`);
    }

    async getAllGlobal() {
        return await this.request(`/applications/${this.id}/commands`);
    }

    //Util

    /**
     * @param {Command} command 
     * @returns {string}
     */
    commandToCommandJsonString(command) {
        /**@type {CommandJSON} */
        const commandJson = {
            name: command.name,
            description: command.syntax.description,
            options: command.syntax.options,
            default_permission: command.syntax.default_permission
        }
        return JSON.stringify(commandJson);
    }

    /**
     * @param {Command} command 
     * @returns {string}
     */
    commandToPermissionsJsonString(command) {
        /**@type {Permissions} */
        const commandJson = {
            permissions: command.permissions
        }
        return JSON.stringify(commandJson);
    }
}