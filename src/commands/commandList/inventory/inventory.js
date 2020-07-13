const CommandInterface = require("../../CommandInterface");
const Inventory = require("../../../models/inventory");

const shapes = { 
    "square" : ":white_square_button:",
    "heart" : ":heart_decoration:",
    "circle" : ":radio_button:",
    "diamond" : ":large_orange_diamond:",
    "triangle" : ":small_red_triangle:",
    "star": ":star2:"
};

module.exports = new CommandInterface({
    execute: async function(p){

        if(p.args.length>1&&p.args[1]=="set"){
            setItem(p);
        } else if (p.args.length>1) {
            p.syntax();
        } else {
            openInv(p);
        }

    }
});

async function setItem(p){
    if(p.args.length!=4){sendSetSyntaxError(p); return;}
    if(!shapes[p.args[2]]){sendShapeError(p); return;}
    if(isNaN(parseInt(p.args[3]))){sendNumberError(p); return;}
    
    await Inventory.set(p.user.id, p.args[2], p.args[3]);
    openInv(p);
}

async function openInv(p){

    let embed = {
          "color": 13679088,
          "author": {
            "name": p.user.username + "'s Inventory",
            "icon_url": p.user.avatarURL
          },
          "fields": [
            {
              "name": "Shapes:",
              "value": ""
            }
          ]
        };

    let inv = await Inventory.get(p.user.id);

    for(shape in shapes){
        embed.fields[0].value += shapes[shape] + " `x" + inv[shape] + "` ";
    }

    p.send({embed});
}

async function sendShapeError(p){
    let msg = "That is not a shape, the avaliable shapes are "
    for(shape in shapes){
        msg += "`" + shape + "`, "
    }
    p.send(msg.slice(0,-2));
}

async function sendSetSyntaxError(p){
    p.send("Use `" + p.prefix + "inventory set {shape} {number}`");
}

async function sendNumberError(p){
    p.send("`" + p.args[3] + "` is not a number");
}