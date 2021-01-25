const Base = require("./Base");
const User = require("./User");
const Collection = require("./Collection");
const Role = require("./Role");

module.exports = class Member extends Base{

    constructor(data, guildRoles){
        super(data.user.id);
        this.user = new User(data.user);
        this.nick = data.nick;
        this.roles = new Collection(Role);
        this.joinedAt = new Date(data.joined_at);
        this.joinedAtFullTimeStamp = `${this.joinedAt.toDateString()} ${this.joinedAt.toLocaleString("en-US", {timeStyle: "short"})}`;
        this.guildRoles = guildRoles;

        for(const roleID of data.roles){
            const role = this.guildRoles.get(roleID);
            this.roles.add(role);
        }
    }

    update(data, guildRoles){
        const properties = `nick`;
        for(property of properties.split(" ")){
            if(data[property] !== undefined){
                this[property] = data[property];
            }
        }
        //Get latest roles
        if(guildRoles !== undefined){
            this.guildRoles = guildRoles;
        }
        //Update user
        this.user.update(data.user);
        //Update roles
        this.roles.clear();
        for(const id of data.roles){
            const role = this.guildRoles.get(id);
            this.roles.add(role);
        }
    }

}