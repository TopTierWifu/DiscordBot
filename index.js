const Eris = require("eris");
const config = require('./config.json');
let bot = new Eris(config.token);
const requireDir = require('require-dir');
const dir = requireDir('./');

bot.on("ready", () => {
    console.log("Ready!");
});

bot.on("messageCreate", (msg) => {
    for(file in dir){
        if(file="test"){
            console.log(new dir[file]("Test passed"));
        }
    }
})

bot.connect();