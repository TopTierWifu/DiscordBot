const Base = require("./Base");
const Collection = require("./Collection");
const Member = require("./Member");
const Role = require("./Role");
const Presence = require("./Presence");

module.exports = class Guild extends Base{

    constructor(data){
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

    iconURL(size){
        size = size ? size : 1024;
        return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}?size=${size}`
    }

    update(data){
        const properties = `name icon unavailable member_count`;
        for(const property of properties.split(" ")){
            if(data[property] !== undefined){
                this[property] = data[property];
            }
        }
        return this;
    }

    createRole(role){
        return this.roles.add(role);
    }

    updateRole(role){
        return this.roles.update(role);
    }

    deleteRole(role){
        return this.roles.remove(role);
    }

    addMember(member){
        return this.members.add(member, this.roles);
    }

    updateMember(member){
        return this.members.update(member, this.roles);
    }

    deleteMember(member){
        return this.members.remove(member);
    }

    updatePresence(presence){
        return this.presences.update(presence);
    }

}