/**
 * @typedef {import("../typings/eris").Client} Client
 * @typedef {import("../typings/eris").Member} Member
 */

/**@type {Client} */
let CLIENT;

/**@arg {Client} client */
exports.init = (client) => {
    CLIENT = client;
}

/**
 * Returns a decimal color code (hex code in base 10)
 * @arg {Member} member 
 */
exports.memberColor = (member) => {
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
 * @arg {string} id 
 */
exports.user = async (id) => {
    let user = CLIENT.users.get(id);
    if (!user) {
        try {
            user = await CLIENT.getRESTUser(id);
            CLIENT.users.add(user, CLIENT, false);
        } catch (error) {
            return;
        }
    }
    return user;
}