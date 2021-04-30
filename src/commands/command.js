/**
 * @typedef ApplicationCommandOption
 * @prop {import("../events/interactionCreate").ApplicationCommandOptionType} type Value of ApplicationCommandOptionType
 * @prop {string} name 1-32 character name matching ^[\w-]{1,32}$
 * @prop {string} description 1-100 character description
 * @prop {boolean} [required] If the parameter is required or optional--default false
 * @prop {ApplicationCommandOptionChoice} [choices] Choices for string and int types for the user to pick from
 * @prop {ApplicationCommandOption[]} [options] If the option is a subcommand or subcommand group type, this nested options will be the parameters
 */

/**
 * @typedef ApplicationCommandOptionChoice
 * @prop {string} name 1-100 character choice name
 * @prop {string | number} value Value of the choice, up to 100 characters if string
 */

/**
 * @typedef ApplicationCommand
 * @prop {import("../events/interactionCreate").snowflake} id Unique id of the command
 * @prop {import("../events/interactionCreate").snowflake} application_id Unique id of the parent application
 * @prop {string} name 1-32 character name matching ^[\w-]{1,32}$
 * @prop {string} description 1-100 character description
 * @prop {ApplicationCommandOption[]} [options] The parameters for the command
 * @prop {boolean} [default_permission=true] Whether the command is enabled by default when the app is added to a guild
 */

module.exports = class Command {
    /**
     * Command constructor
     * @arg {object} args
     * @arg {Omit<ApplicationCommand, "application_id">} args.syntax
     * @arg {number} args.cooldown
     * @arg {(ctx: import("./commandHandler").ctx) => Promise<void>} args.execute
     */
    constructor(args){
        this.id = args.syntax.id;
        this.name = args.syntax.name;
        this.cooldown = args.cooldown;
        this.execute = args.execute;
    }
}