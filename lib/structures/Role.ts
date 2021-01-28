import { Base } from "./Base";

export class Role extends Base{

    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: string;
    mentionable: boolean;

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