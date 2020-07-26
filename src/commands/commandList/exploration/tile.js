const CommandInterface = require("../../CommandInterface");
const Profile = require("../../../models/user/profile");
const { isNumber } = require("util");

module.exports = new CommandInterface({

    category: "Exploration",

    execute: async function(p){
        if(parseInt(p.args[1])){
            let tile = parseInt(p.args[1]);
            let profile = await Profile.get(p.user.id);
            if(tile > profile.bestTile){
                p.send("You have not explored that tile yet!");
                return;
            } else if(tile < 0){
                p.send("You can't explore a negative tile silly.");
                return;
            }
            profile.tile = tile;
            profile.tileProgress = 0;
            (await profile).save();
            p.send("You are now in tile " + tile);
        } else if(p.args[1]){
            p.send("That is not a number!");
        } else {
            p.send("Please specify a tile number.");
        }
    }
  });
