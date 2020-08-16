const CommandInterface = require("../../commandInterface");

module.exports = new CommandInterface({

    alias:["profile", "p"],

    desc: "View your equiped items, gold, and experience",

    category: "User",
    
    execute: async function(p){
        let pf = await p.getDoc("Profile");

        p.embed.author.name = p.sender.username + "'s Profile";
        p.embed.author.icon_url = p.sender.avatarURL;

        p.embed.description = "**Experience:** " + pf.experience;

        p.sendEmbed();
    }
});