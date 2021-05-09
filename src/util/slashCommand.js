/**
 * @typedef {import("../commands/command").ApplicationCommand} ApplicationCommand
 * @typedef {Omit<ApplicationCommand, "application_id" | "id">} CommandJSON
 * @typedef {import("../commands/command")} Command
 * @typedef {import("../commands/command").CommandPermissions} Permissions
 */

module.exports = class SlashCommand {
    /**
     * @param {import("../bot") | import("../commandEditor")} base 
     */
     constructor(base) {
        /**@private */
        this.base = base;
        this.id = base.bot.user.id;
    }

    //Guild Endpoints

    /**
     * @param {string} guildId
     * @param {Command} command
     */
    async createGuild(guildId, command) {
        return await this.base.requestREST(
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
        return await this.base.requestREST(
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
        return await this.base.requestREST(`/applications/${this.id}/guilds/${guildId}/commands/${commandId}`, "DELETE");
    }

    /**
     * @param {string} commandId 
     * @param {string} guildId
     */
    async getGuild(commandId, guildId) {
        return await this.base.requestREST(`/applications/${this.id}/guilds/${guildId}/commands/${commandId}`);
    }

    /**
     * @param {string} guildId 
     */
    async getAllGuild(guildId) {
        return await this.base.requestREST(`/applications/${this.id}/guilds/${guildId}/commands`);
    }

    /**
     * @param {string} guildId 
     * @param {Command} command
     */
    async getGuildPermissions(guildId, command) {
        return await this.base.requestREST(`/applications/${this.id}/guilds/${guildId}/commands/${command.id}/permissions`);
    }

    /**
     * @param {string} guildId 
     */
    async getAllGuildPermissions(guildId) {
        return await this.base.requestREST(`/applications/${this.id}/guilds/${guildId}/commands/permissions`);
    }

    /**
     * @param {string} guildId 
     * @param {Command} command
     */
     async editGuildPermissions(guildId, command) {
        return await this.base.requestREST(
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
        return await this.base.requestREST(
            `/applications/${this.id}/commands`, 
            "POST", 
            this.commandToCommandJsonString(command)
        );
    }

    /**
     * @param {Command} command
     */
    async editGlobal(command) {
        return await this.base.requestREST(
            `/applications/${this.id}/commands/${command.id}`, 
            "PATCH", 
            this.commandToCommandJsonString(command)
        );
    }

    /**
     * @param {string} commandId 
     */
    async deleteGlobal(commandId){
        return await this.base.requestREST(`/applications/${this.id}/commands/${commandId}`, "DELETE")
    }

    /**
     * @param {string} commandId 
     */
    async getGlobal(commandId) {
        return await this.base.requestREST(`/applications/${this.id}/commands/${commandId}`);
    }

    async getAllGlobal() {
        return await this.base.requestREST(`/applications/${this.id}/commands`);
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