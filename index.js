const Client = require("./lib/client");
const TOKEN = require("./secret.json").TOKEN;

const BOT = new Client(TOKEN);
BOT.login();

// async function test(){
//     let test = await BOT.rest.getUser("210177401064390658");
//     console.log(test);
// }

// test();

// BOT.on("ready", () => {
//     console.log("Bot has logged in");
// });