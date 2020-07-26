const CommandInterface = require("../../CommandInterface");
const Profile = require("../../../models/user/profile");
const MapData = require("../../../data/map.json");

module.exports = new CommandInterface({

    category: "Exploration",


    execute: async function(p){
      openMap(p);
    }
  });

async function openMap(p){
  let profile = await Profile.get(p.user.id);
  let map = "";

  for(i = 1; i<=100; i++){
    if(profile.tile == i){
      map += ":x:";
    } else if(profile.bestTile >= i){
      map += MapData.map[i-1];
    } else {
      map += "▫️";
    }
    if(i%10==0){map += "\n";}
  }

  p.send(map);
}
