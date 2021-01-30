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
        this.joinedAtFormatted  = this.formatDate(this.joinedAt);
        this.guildRoles = guildRoles;
        this.color = 0;
        this.orderedRoles = [];

        this.updateRoles(data);
    }

    update(data, guildRoles){
        const properties = `nick`;
        for(const property of properties.split(" ")){
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
        this.updateRoles(data);
    }

    updateRoles(data){
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

    toString(){
        return this.user.mention;
    }

}