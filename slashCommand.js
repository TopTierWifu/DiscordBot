const debug = true;

/**
 * @typedef {Omit<import("./src/commands/command").ApplicationCommand, "application_id" | "id">} Command
 */
const fetch = require("node-fetch").default;
const { token } = require("../tokens/bot-auth.json");
const botID = debug ? "741854059748786176" : "539465213246963724";
const testGuildID = "604719438805205004";
const discordURL = "https://discord.com/api/v8";

/**@type {Command} */
const json = {
    name: "avatar",
    description: "Displays a Discord user's information",
    options: [
        {
            name: "user",
            description: "The user, can be an ID",
            type: 6,
            required: false
        }
    ]
}

/**
 * 
 * @param {string} route 
 * @param {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} method 
 * @param {*} [body] 
 */
function request(route, method = "GET", body) {
    return fetch(`${discordURL}${route}`, { method, body, headers: { 'Content-Type': 'application/json', Authorization: `Bot ${token}` } })
    .then(res => res.json());
}

/**
 * @param {*} body 
 */
async function createGuildCommand(body) {
    return await request(`/applications//${botID}/guilds/${testGuildID}/commands`, "POST", JSON.stringify(body));
}

/**
 * @param {string} commandId 
 * @param {*} body
 */
async function editGuildCommand(commandId, body) {
    return await request(`/applications/${botID}/guilds/${testGuildID}/commands/${commandId}`, "PATCH", JSON.stringify(body));
}

/**
 * @param {string} commandId 
 */
async function deleteGuildCommand(commandId) {
    return await request(`/applications/${botID}/guilds/${testGuildID}/commands/${commandId}`, "DELETE");
}

async function getGuildCommands() {
    return await request(`/applications/${botID}/guilds/${testGuildID}/commands`)
}

async function getGlobalCommands() {
    return await request(`/applications/${botID}/commands`);
}

getGlobalCommands().then(res => console.log(res));