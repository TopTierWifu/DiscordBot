const requireDir = require('require-dir');
const dir = requireDir('./');

class EventHandler{
    constructor(bot){
        let filename = __filename.slice(__dirname.length + 1);  //Getting name of this file (EventHandler)
        for(file in dir){   //For each file in the /events directory
            if(file!=filename){ //If the filename is not of this file (EventHandler)
                const handler = new dir[file];
            }
        }
    }
}

module.exports = EventHandler;