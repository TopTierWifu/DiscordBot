/**
 * @typedef {import("../typings/command").ApplicationCommand} ApplicationCommand
 * @typedef {import("../typings/command").ApplicationCommandPermissions} ApplicationCommandPermissions
 * @typedef {import("../typings/command").Context} Context
 */

module.exports = class Command {
    /**
     * Command constructor
     * @arg {object} args
     * @arg {Omit<ApplicationCommand, "application_id">} args.syntax
     * @arg {number} args.cooldown
     * @arg {(ctx: Context) => Promise<void>} args.execute
     * @arg {ApplicationCommandPermissions[]} [args.permissions]
     */
    constructor(args) {
        this.id = args.syntax.id;
        this.name = args.syntax.name;
        this.cooldown = args.cooldown;
        this.execute = args.execute;
        this.syntax = args.syntax;
        this.permissions = args.permissions
    }
}