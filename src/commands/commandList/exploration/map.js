const CommandInterface = require("../../commandInterface");
const MapData = require("../../../data/map.json");

module.exports = new CommandInterface({

    alias:["map"],

    usage: "{#}",

    desc: "View the world map",

    examples: ["map 2", "map"],

    category: "Exploration",
    
    execute: async function(p){
        openMap(p);
  }
});

async function openMap(p){
    let pf = await p.db.User.findById(p.sender.id) ?? await p.db.User.create({_id: p.sender.id});
    let map = "";

    for(i = 1; i<=100; i++){
        if(pf.tile == i){
            map += ":x:";
        } else if(pf.bestTile >= i){
            map += MapData.tileSet[MapData.map[i-1]].icon;
        } else {
            map += "▫️";
        }
        if(i%10==0){map += "\n";}
    }

    p.send(map);
}
