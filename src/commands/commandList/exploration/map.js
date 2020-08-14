const CommandInterface = require("../../commandInterface");
const MapData = require("../../../data/map.json");

module.exports = new CommandInterface({

    alias:["map"],

    usage: "{#}",

    desc: "View the world map",

    examples: ["map 2", "map"],

    category: "Exploration",
    
    execute: async function(p){
        let pf = await p.db.User.findById(p.sender.id) ?? await p.db.User.create({_id: p.sender.id});
        let map = "";
        let offset = pf.tile - pf.tile%25;

        for(i = 1 + offset; i <= 25 + offset; i++){
            if(pf.tile == i){
                map += MapData.tileSet[MapData.map[i-1]]?.icons[1];
            } else if(pf.bestTile >= i){
                map += MapData.tileSet[MapData.map[i-1]]?.icons[0];
            } else {
                map += "▫️";
            }
            if(i%5==0){map += "\n";}
        }

        p.send(map);
  }
});