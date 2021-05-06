const Eris = require("eris");

module.exports = class Get {
    /**
     * @param {import("../bot")} base 
     */
    constructor(base) {
        /**@private */
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
            if (role?.position > pos && role.color) {
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
    async user(id) {
        let user = this.bot.users.get(id);
        if (!user) {
            try {
                user = await this.bot.getRESTUser(id);
                this.bot.users.add(user, this.bot, false);
            } catch (error) {
                return;
            }
        }
        return user;
    }
}