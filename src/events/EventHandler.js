const DiscordBot = require("../bot.js")
const requireDir = require('require-dir');
const dir = requireDir('./');   //Returns object with file name as keys and "require()'s" as values

module.exports = class EventHandler{
    constructor(main){
        let filename = __filename.slice(__dirname.length + 1);  //Getting name of this file (EventHandler)
        for(let file in dir){   //For each file in the /events directory
            if(file!=filename){ //If the filename is not of this file (EventHandler)
                const handler = new dir[file](main);  //Creates an instance of the value (require()'d file) for the key "file" (which is the file's name) 
                main.bot.on(file, handler.handle.bind(handler));
                //This takes the instance of the bot that was used in constructor and adds a listener for each of the file's names
                //By naming the files by the listener they handle, the file name can be used as the name of the listener in arg0
                //The handler instance's handle function is used as the function to be executed whenever the listener is ticked in arg1
                //.bind is used so that the scope of this is passed on to the listener and not main
            }
        }
    }
}