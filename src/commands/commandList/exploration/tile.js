const CommandInterface = require("../../commandInterface");

module.exports = new CommandInterface({

    alias:["tile"],

    usage: "{#}",

    desc: "Change your location on the map for new adventures",

    examples: ["tile 2", "tile 54"],

    category: "Exploration",
    
    execute: async function(p){
        let pf = await p.db.User.findById(p.sender.id) ?? await p.db.User.create({_id: p.sender.id});
        if(tile = parseInt(p.args[0])){
            if(tile > pf.bestTile){
                p.warn("You have not explored that tile yet!");
                return;
            } else if(tile < 0){
                p.warn("You can't explore a negative tile, silly.");
                return;
            }
            await p.db.User.updateOne({ _id: p.sender.id}, {$set: {tile: tile, tileProgress: 0}});
            p.send("You are now in tile " + tile);
        } else if(p.args[0]){
            p.warn("That is not a number!");
        } else {
            p.send("You are on tile " + pf.tile);
        }
    }
});