const debug = require("../tokens/bot-auth.json").debug;

/**
 * @typedef {Omit<import("./src/commands/command").ApplicationCommand, "application_id" | "id">} Command
 */
const fetch = require("node-fetch").default;
const auth = require("../tokens/bot-auth.json");
const botAuth = debug ? auth.testBotAuth : auth.botAuth;

const testGuildID = "604719438805205004";
const testCommandID = "838261981815373865";

/**@type {Command} */
const json = {
    name: "about",
    description: "Info about the bot",
    options: []
}

/**
 * 
 * @param {string} route 
 * @param {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} method 
 * @param {*} [body] 
 */
async function request(route, method = "GET", body) {
    return fetch(`https://discord.com/api/v8${route}`, { method, body, headers: { 'Content-Type': 'application/json', Authorization: `Bot ${botAuth.token}` } })
    .then(async res => {
        try {
            return await res.json();
        } catch (error) {
            return res;
        }
    });
}

/*
 * GUILD COMMANDS
 */

/**
 * @param {string} guildId
 * @param {*} body 
 */
async function createGuildCommand(guildId, body) {
    return await request(`/applications//${botAuth.id}/guilds/${guildId}/commands`, "POST", JSON.stringify(body));
}

/**
 * @param {string} commandId 
 * @param {string} guildId
 * @param {*} body
 */
async function editGuildCommand(commandId, guildId, body) {
    return await request(`/applications/${botAuth.id}/guilds/${guildId}/commands/${commandId}`, "PATCH", JSON.stringify(body));
}

/**
 * @param {string} commandId 
 * @param {string} guildId
 */
async function deleteGuildCommand(commandId, guildId) {
    return await request(`/applications/${botAuth.id}/guilds/${guildId}/commands/${commandId}`, "DELETE");
}

/**
 * @param {string} guildId 
 */
async function getGuildCommands(guildId) {
    return await request(`/applications/${botAuth.id}/guilds/${guildId}/commands`)
}



/*
 * GLOBAL COMMANDS
 */

/**
 * @param {*} body 
 */
async function createGlobalCommand(body) {
    return await request(`/applications/${botAuth.id}/commands`, "POST", JSON.stringify(body));
}

/**
 * @param {string} commandId 
 */
async function deleteGlobalCommand(commandId){
    request(`/applications/${botAuth.id}/commands/${commandId}`, "DELETE")
}

async function getGlobalCommands() {
    return await request(`/applications/${botAuth.id}/commands`);
}


/*
 * TEST COMMAND
 */

/**
 * @param {*} body 
 */
async function editTestCommand(body) {
    return await editGuildCommand(testCommandID, testGuildID, body);
}

// deleteGlobalCommand("840077753155190795").then(res => console.log(res));