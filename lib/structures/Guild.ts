import { Base } from "./Base";
import { Collection } from "./Collection";
import { Member } from "./Member";
import { Role } from "./Role";
import { Presence } from "./Presence";

export class Guild extends Base{

    name: string;
    icon: string;
    roles: Collection;
    joinedAt: Date;
    unavailable: boolean;
    member_count: number;
    members: Collection;
    presences: Collection;

    constructor(data: any){
        super(data.id);
        this.name = data.name;
        this.icon = data.icon;
        this.roles = new Collection(Role);
        this.joinedAt = new Date(data.joined_at);
        this.unavailable = data.unavailable;
        this.member_count = data.member_count;
        this.members = new Collection(Member);
        this.presences = new Collection(Presence);

        for(const role of data.roles){
            this.roles.add(role);
        }
        for(const member of data.members){
            this.members.add(member, this.roles);
        }
        for(const presence of data.presences){
            this.presences.add(presence);
        }
    }

    iconURL(size: number){
        size = size ? size : 1024;
        return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}?size=${size}`
    }

    update(data: any){
        if(data.name !== undefined){
            this.name = data.name;
        }
        if(data.icon !== undefined){
            this.icon = data.icon;
        }
        if(data.unavailable !== undefined){
            this.unavailable = data.unavailable;
        }
        if(data.member_count !== undefined){
            this.member_count = data.member_count;
        }
        return this;
    }

    createRole(role: any){
        return this.roles.add(role);
    }

    updateRole(role: any){
        return this.roles.update(role);
    }

    deleteRole(role: any){
        return this.roles.remove(role);
    }

    addMember(member: any){
        return this.members.add(member, this.roles);
    }

    updateMember(member: any){
        return this.members.update(member, this.roles);
    }

    deleteMember(member: any){
        return this.members.remove(member);
    }

    updatePresence(presence: any){
        return this.presences.update(presence);
    }

}