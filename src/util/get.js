const Eris = require("eris");

module.exports = class Get {
    /**
     * @param {import("../bot")} base 
     */
    constructor(base){
        this.bot = base.bot;
    }

    /**
     * Returns a decimal color code (hex code in base 10)
     * @param {Eris.Member} member 
     */
    memberColor(member) {
        let color, pos = -1;
        member?.roles.forEach((id) => {
            const role = member.guild.roles.get(id);
            if(role?.position > pos && role.color) {
                color = role.color;
                pos = role.position;
            }
        });
        return color ?? 0;
    }

    /**
     * Get a user by id, if they don't exist, then we will try a rest fetch and cache
     * @param {string} id 
     */
    user(id) {

    }
}