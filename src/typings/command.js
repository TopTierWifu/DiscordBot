/**
 * @typedef {import("./bot").Snowflake} Snowflake
 * @typedef {import("./bot").Get} Get
 * @typedef {import("./bot").Format} Format
 * @typedef {import("./bot").Items} Items
 * @typedef {import("./eris").Client} Client
 * @typedef {import("./eris").Guild} Guild
 * @typedef {import("./eris").Member} Member
 * @typedef {import("./eris").WebhookPayload} WebhookPayload
 * @typedef {import("./eris").Message} Message
 * @typedef {import("./interaction").Interaction} Interaction
 * @typedef {import("./send").InteractionResponseData} InteractionResponseData
 * @typedef {import("./send").InteractionResponse} InteractionResponse
 */

/**
 * @typedef {import("../commands/command")} Command
 */

/**
 * @typedef ApplicationCommand
 * @prop {Snowflake} id Unique id of the command
 * @prop {Snowflake} application_id Unique id of the parent application
 * @prop {string} name 1-32 character name matching ^[\w-]{1,32}$
 * @prop {string} description 1-100 character description
 * @prop {ApplicationCommandOption[]} [options] The parameters for the command
 * @prop {boolean} [default_permission=true] Whether the command is enabled by default when the app is added to a guild
 */

/**
 * @typedef ApplicationCommandOption
 * @prop {ApplicationCommandOptionType} type SUB_COMMAND: 1, SUB_COMMAND_GROUP: 2, STRING: 3, INTEGER: 4, BOOLEAN: 5, USER: 6, CHANNEL: 7, ROLE: 8
 * @prop {string} name 1-32 character name matching ^[\w-]{1,32}$
 * @prop {string} description 1-100 character description
 * @prop {boolean} [required] If the parameter is required or optional--default false
 * @prop {ApplicationCommandOptionChoice} [choices] Choices for string and int types for the user to pick from
 * @prop {ApplicationCommandOption[]} [options] If the option is a subcommand or subcommand group type, this nested options will be the parameters
 */

/**
 * @typedef {1|2|3|4|5|6|7|8} ApplicationCommandOptionType SUB_COMMAND: 1, SUB_COMMAND_GROUP: 2, STRING: 3, INTEGER: 4, BOOLEAN: 5, USER: 6, CHANNEL: 7, ROLE: 8
 */

/**
 * @typedef ApplicationCommandOptionChoice
 * @prop {string} name 1-100 character choice name
 * @prop {string | number} value Value of the choice, up to 100 characters if string
 */

/**
 * @typedef ApplicationCommandPermissions
 * @prop {Snowflake} id The id of the role or user
 * @prop {1 | 2} type 1 for role, 2 for user
 * @prop {boolean} permission True to allow, false, to disallow
 */

/**
 * @typedef CommandPermissions
 * @prop {ApplicationCommandPermissions[]} permissions The permissions for the command in the guild
 */

/**
 * @typedef Context
 * @prop {Client} bot
 * @prop {Interaction} interaction
 * @prop {Guild} guild
 * @prop {Member} member
 * @prop {(response: InteractionResponseData | String)=>Promise<InteractionResponse>} respond
 * @prop {(message: WebhookPayload)=>Promise<Message>} followup
 * @prop {Get} get
 * @prop {Format} format
 * @prop {(sql: string, variables?: *[])=>Promise<any>} query
 * @prop {Items} items
 */

export {};