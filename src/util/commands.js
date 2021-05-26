// Request
const fetch = require("node-fetch").default;

/**
 * @typedef {Omit<import("../typings/command").ApplicationCommand, "application_id" | "id">} CommandJSON
 * @typedef {import("../typings/command").Command} Command
 * @typedef {import("../typings/command").CommandPermissions} Permissions
 * @typedef {import("../typings/bot").Auth} Auth
 * @typedef {import("../typings/bot").HTTPMethods} HTTPMethods
 */

/**@type {Auth} */
let AUTH;

/**@arg {Auth} auth */
exports.init = (auth) => {
    AUTH = auth;
}

/**
 * @arg {string} route 
 * @arg {HTTPMethods} [method] 
 * @arg {*} [body] 
 */
async function request(route, method = "GET", body) {
    return fetch(`https://discord.com/api/v8${route}`, {
        method,
        body,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${AUTH.token}`
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
 * @arg {string} guildId
 * @arg {Command} command
 */
exports.createGuild = async (guildId, command) => {
    return await request(
        `/applications/${AUTH.id}/guilds/${guildId}/commands`,
        "POST",
        commandToCommandJsonString(command)
    );
}

/**
 * @arg {string} guildId
 * @arg {Command} command
 */
exports.editGuild = async (guildId, command) => {
    return await request(
        `/applications/${AUTH.id}/guilds/${guildId}/commands/${command.id}`,
        "PATCH",
        commandToCommandJsonString(command)
    );
}

/**
 * @arg {string} commandId 
 * @arg {string} guildId
 */
exports.deleteGuild = async (commandId, guildId) => {
    return await request(`/applications/${AUTH.id}/guilds/${guildId}/commands/${commandId}`, "DELETE");
}

/**
 * @arg {string} commandId 
 * @arg {string} guildId
 */
exports.getGuild = async (commandId, guildId) => {
    return await request(`/applications/${AUTH.id}/guilds/${guildId}/commands/${commandId}`);
}

/**@arg {string} guildId */
exports.getAllGuild = async (guildId) => {
    return await request(`/applications/${AUTH.id}/guilds/${guildId}/commands`);
}

/**
 * @arg {string} guildId 
 * @arg {Command} command
 */
exports.getGuildPermissions = async (guildId, command) => {
    return await request(`/applications/${AUTH.id}/guilds/${guildId}/commands/${command.id}/permissions`);
}

/**@arg {string} guildId */
exports.getAllGuildPermissions = async (guildId) => {
    return await request(`/applications/${AUTH.id}/guilds/${guildId}/commands/permissions`);
}

/**
 * @arg {string} guildId 
 * @arg {Command} command
 */
exports.editGuildPermissions = async (guildId, command) => {
    return await request(
        `/applications/${AUTH.id}/guilds/${guildId}/commands/${command.id}/permissions`,
        "PUT",
        commandToPermissionsJsonString(command)
    );
}

//Global Endpoints

/**@arg {Command} command*/
exports.createGlobal = async (command) => {
    return await request(
        `/applications/${AUTH.id}/commands`,
        "POST",
        commandToCommandJsonString(command)
    );
}

/**@arg {Command} command*/
exports.editGlobal = async (command) => {
    return await request(
        `/applications/${AUTH.id}/commands/${command.id}`,
        "PATCH",
        commandToCommandJsonString(command)
    );
}

/**@arg {string} commandId */
exports.deleteGlobal = async (commandId) => {
    return await request(`/applications/${AUTH.id}/commands/${commandId}`, "DELETE")
}

/**@arg {string} commandId */
exports.getGlobal = async (commandId) => {
    return await request(`/applications/${AUTH.id}/commands/${commandId}`);
}

exports.getAllGlobal = async () => {
    return await request(`/applications/${AUTH.id}/commands`);
}

//Util

/**@arg {Command} command */
function commandToCommandJsonString(command) {
    /**@type {CommandJSON} */
    const commandJson = {
        name: command.name,
        description: command.syntax.description,
        options: command.syntax.options,
        default_permission: command.syntax.default_permission
    }
    return JSON.stringify(commandJson);
}

/**@arg {Command} command */
function commandToPermissionsJsonString(command) {
    /**@type {Permissions} */
    const commandJson = {
        permissions: command.permissions
    }
    return JSON.stringify(commandJson);
}