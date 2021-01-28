import { Base } from "./Base";
import { User } from "./User";

export class Presence extends Base{

    constructor(data){
        super(data.user.id);
        this.user = new User(data.user);
        this.status = data.status;
    }

    update(data){
        const properties = `status`;
        for(property of properties.split(" ")){
            if(data[property] !== undefined){
                this[property] = data[property];
            }
        }
        this.user.update(data.user);
    }

    toString(){
        return this.user.mention;
    }

}