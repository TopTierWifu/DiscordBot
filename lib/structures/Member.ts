import { Base } from "./Base";
import { User } from "./User";
import { Collection } from "./Collection";
import { Role } from "./Role";

export class Member extends Base{

    user: User;
    nick: string;
    roles: Collection;
    joinedAt: Date;
    joinedAtFormatted: string;
    guildRoles: any;
    color: number;
    orderedRoles: Role[];

    constructor(data: any, guildRoles: Collection){
        super(data.user.id);
        this.user = new User(data.user);
        this.nick = data.nick;
        this.roles = new Collection(Role);
        this.joinedAt = new Date(data.joined_at);
        this.joinedAtFormatted = this.formatDate(this.joinedAt);
        this.guildRoles = guildRoles;
        this.color = 0;
        this.orderedRoles = [];

        this.updateRoles(data);
    }

    update(data: any, guildRoles: Collection){
        if(data.nick !== undefined){
            this.nick = data.nick;
        }
        //Get latest roles
        if(guildRoles !== undefined){
            this.guildRoles = guildRoles;
        }
        //Update user
        this.user.update(data.user);
        //Update roles
        this.updateRoles(data);
    }

    updateRoles(data: any){
        this.roles.clear();
        for(const roleID of data.roles){
            const role = this.guildRoles.get(roleID);
            this.roles.add(role);
        }

        let position = 0;
        this.orderedRoles = [];

        this.roles.forEach((role) => {
			this.orderedRoles[role.position] = role;
			if((role.position > position) && role.color) {
				this.color = role.color;
				position = role.position;
			}
        });
        
		this.orderedRoles = this.orderedRoles.reverse().filter((x) => x !== undefined);
    }

}