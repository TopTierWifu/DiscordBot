const CommandInterface = require("../../commandInterface");
const MONSTERS = ["Slime","Rabbit","Snake","Chicken","Cow","Pig","Rooster","Hen","Lion","Bee","Deer","Zombie","Skeleton"]

module.exports = new CommandInterface({

    alias:["explore", "e"],

    desc: "Explore the map to fight monsters, find loot, and level up",

    category: "Exploration",

    execute: async function(p){
        let enemy = MONSTERS[Math.floor(Math.random()*MONSTERS.length)];

        p.embed.author.name = "Battle with a " + enemy;
        p.embed.description = 'Fighting...';

        let msg = await p.sendEmbed();
        
        setTimeout(async function(){
        await p.db.Profile.updateOne(
            {_id: p.sender.id},
            {$inc: {experience: 1}},
            {upsert: true}
        );
        p.embed.description = "You gained 1 experience!";
        let embed = p.embed;
        await msg.edit({embed});
        }, 1500);
    }    
});