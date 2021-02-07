const fetch = require("node-fetch");
const {TOKEN} = require("./secret.json");

const body = {}

fetch("https://discord.com/api/v8/applications/539465213246963724/guilds/604719438805205004/commands", {
    method: `POST`,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', Authorization: `Bot ${TOKEN}` }
})
.then(res => res.json())
.then(json => console.log(json));