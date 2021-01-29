import { Base } from "./Base";
import { User } from "./User";

export class Presence extends Base{

    user: User;
    status: string;

    constructor(data: any){
        super(data.user.id);
        this.user = new User(data.user);
        this.status = data.status;
    }

    update(data: any){
        if(data.status !== undefined){
            this.status = data.status;
        }
        this.user.update(data.user);
    }

    toString(){
        return this.user.mention;
    }

}