const CommandInterface = require("../../commandInterface");

module.exports = new CommandInterface({

    alias:["status", "s"],

    desc: "View your equiped items, gold, and experience",

    category: "User",
    
    execute: async function(p){
        p.embed.author.name = p.sender.username + "'s Profile";
        p.embed.author.icon_url = p.sender.avatarURL;

        p.sendEmbed();
    }
});