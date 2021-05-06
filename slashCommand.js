const debug = require("../tokens/bot-auth.json").debug;

/**
 * @typedef {Omit<import("./src/commands/command").ApplicationCommand, "application_id" | "id">} Command
 */
const fetch = require("node-fetch").default;
const token = debug ? require("../tokens/bot-auth.json").testToken : require("../tokens/bot-auth.json").token;
const botID = debug ? "741854059748786176" : "539465213246963724";

const testGuildID = "604719438805205004";
const testCommandID = "798081847266770945";
const wifuID = "210177401064390658";

const discordURL = "https://discord.com/api/v8";

/**@type {Command} */
const json = {
    name: "test",
    description: "This is a test",
    options: [
        { 
            type: 3, 
            name: 'messageID', 
            description: 'The message ID of the first zoo message',
            required: true
        },
        {
            type: 4,
            name: 'zooLength',
            description: "The number of messages long the zoo is",
            required: true
        }

    ]
}

/**
 * 
 * @param {string} route 
 * @param {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} method 
 * @param {*} [body] 
 */
async function request(route, method = "GET", body) {
    return fetch(`${discordURL}${route}`, { method, body, headers: { 'Content-Type': 'application/json', Authorization: `Bot ${token}` } })
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
    return await request(`/applications//${botID}/guilds/${guildId}/commands`, "POST", JSON.stringify(body));
}

/**
 * @param {string} commandId 
 * @param {string} guildId
 * @param {*} body
 */
async function editGuildCommand(commandId, guildId, body) {
    return await request(`/applications/${botID}/guilds/${guildId}/commands/${commandId}`, "PATCH", JSON.stringify(body));
}

/**
 * @param {string} commandId 
 * @param {string} guildId
 */
async function deleteGuildCommand(commandId, guildId) {
    return await request(`/applications/${botID}/guilds/${guildId}/commands/${commandId}`, "DELETE");
}

/**
 * @param {string} guildId 
 */
async function getGuildCommands(guildId) {
    return await request(`/applications/${botID}/guilds/${guildId}/commands`)
}



/*
 * GLOBAL COMMANDS
 */

/**
 * @param {*} body 
 */
async function createGlobalCommand(body) {
    return await request(`/applications/${botID}/commands`, "POST", JSON.stringify(body));
}

/**
 * @param {string} commandId 
 */
async function deleteGlobalCommand(commandId){
    request(`/applications/${botID}/commands/${commandId}`, "DELETE")
}

async function getGlobalCommands() {
    return await request(`/applications/${botID}/commands`);
}


/*
 * TEST COMMAND
 */

async function editTestCommand(body) {
    editGuildCommand(testCommandID, testGuildID, body);
}

getGuildCommands(testGuildID).then(res => console.log(res));