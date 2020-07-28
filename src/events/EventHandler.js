const requireDir = require('require-dir');
const dir = requireDir('./');   //Returns object {file.name: require(file.path)}

module.exports = class EventHandler{
    constructor(main){
        let filename = __filename.slice(__dirname.length + 1);  //Getting name of this file (EventHandler)
        for(let file in dir){   //For each file in the /events directory
            if(file!=filename){ //If the filename is not of this file (EventHandler)
                main.bot.on(file, dir[file].handle.bind(main));
                //Ex: file = "messageCreate"
                //On the message create event, execute messageCreate.js's handle function with the scope of the main class  
            }
        }
    }
};