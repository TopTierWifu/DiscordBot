/**
 * @typedef {import("../typings/eris").Client} Client
 * @typedef {import("../typings/eris").Member} Member
 */

module.exports = class Get {
    /**
     * @param {Client} bot 
     */
    constructor(bot) {
        /**@private */
        this.bot = bot;
    }

    /**
     * Returns a decimal color code (hex code in base 10)
     * @param {Member} member 
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