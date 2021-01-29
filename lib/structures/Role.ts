import { Base } from "./Base";

export class Role extends Base{

    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: string;
    mentionable: boolean;

    constructor(data: any){
        super(data.id);
        this.name = data.name;
        this.color = data.color;
        this.hoist = data.hoist;
        this.position = data.position;
        this.permissions = data.permissions;
        this.mentionable = data.mentionable;
    }

    update(data: any){
        if(data.name !== undefined){
            this.name = data.name;
        }
        if(data.color !== undefined){
            this.color = data.color;
        }
        if(data.hoist !== undefined){
            this.hoist = data.hoist;
        }
        if(data.position !== undefined){
            this.position = data.position;
        }
        if(data.permissions !== undefined){
            this.permissions = data.permissions;
        }
        if(data.mentionable !== undefined){
            this.mentionable = data.mentionable;
        }
    }

    toString(){
        return `<@&${this.id}>`;
    }
    
}