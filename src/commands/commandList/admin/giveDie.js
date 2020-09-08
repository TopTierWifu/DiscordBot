const CommandInterface = require("../../commandInterface");
const ITEM_UTIL = require("../utils/itemUtil");

module.exports = new CommandInterface({

    alias:["givedie"],

    execute: async function(p){
        let type = parseInt(p.args[0]);
        p.args.splice(0,1);

        switch(type){
            case 0:
                if(sides = parseInt(p.args[0])){
                    let index = (await ITEM_UTIL.addItem(p, 0, sides)).toString(36);
                    p.send("Added `" + index + "` :game_die: `d[" + sides + "]` to " + p.sender.mention + "'s inventory");
                    break;
                }
                p.warn(p.args[0] + " is not a valid number of sides");
                break;
            case 1:
                let list = [];
                for(index in p.args){
                    if(number = parseInt(p.args[index])){
                        list.push(number)
                    }
                }
                if(list.length){
                    let index = (await ITEM_UTIL.addItem(p, 1, list)).toString(36);
                    p.send("Added `" + index + "` :game_die: `c[" + list.toString() + "]` to " + p.sender.mention + "'s inventory");
                    break;
                }
                p.warn("Please add atleast one number as an argument");
                break;
            case 2:
                let min = parseInt(p.args[0]);
                let max = parseInt(p.args[1]);
                if(min && max){
                    let index = (await ITEM_UTIL.addItem(p, 2, [min, max])).toString(36);
                    p.send("Added `" + index + "` :game_die: `r[" + min + "," + max + "]` to " + p.sender.mention + "'s inventory");
                    break;
                }
                p.warn("Please enter a min and max as arguments");
                break;
            default:
                p.warn("That is not a real die type")
        }
    }
});