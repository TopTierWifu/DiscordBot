const Base = require("./Base");

module.exports = class Role extends Base{

    constructor(data){
        super(data.id);
        this.name = data.name;
        this.color = data.color;
        this.hoist = data.hoist;
        this.position = data.position;
        this.permissions = data.permissions;
        this.mentionable = data.mentionable;
    }

    update(data){
        const properties = `name color hoist position permissions mentionable`;
        for(const property of properties.split(" ")){
            if(data[property] !== undefined){
                this[property] = data[property];
            }
        }
    }

    toString(){
        return `<@&${this.id}>`;
    }
    
}