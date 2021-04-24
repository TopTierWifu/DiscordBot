/**
 * @typedef {`${bigint}`} snowflake
 */

/**
 * @typedef ApplicationCommandInteractionData
 * @prop {snowflake} interaction.data.id The ID of the invoked command
 * @prop {string} interaction.data.name The name of the invoked command
 * @prop {ApplicationCommandInteractionDataResolved} interaction.data.resolved Converted users + roles + channels
 * @prop {ApplicationCommandInteractionDataOption} interaction.data.options The params + values from the user
 */

/**
 * @typedef {object} ApplicationCommandInteractionDataResolved
 * @prop {Object.<string, user>} [users] The IDs and User objects
 * @prop {Object.<string, Omit<member, "user" | "deaf" | "mute">>} [members] The IDs and partial Member objects
 * @prop {Object.<string, role>} [roles] The IDs and Role objects
 * @prop {Object.<string, channel>} [channels] The IDs and partial Channel objects
 */

/**
 * @typedef ApplicationCommandInteractionDataOption
 * @prop {string} name The name of the parameter
 * @prop {ApplicationCommandOptionType} type Value of ApplicationCommandOptionType
 * @prop {unknown} [value] The value of the pair (name, type)
 * @prop {ApplicationCommandInteractionDataOption[]} [options] Present if this option is a group or subcommand
 */

/**
 * @typedef member
 * @prop {user} [user] The user this guild member represents
 * @prop {string} [nick] This users guild nickname
 * @prop {snowflake[]} roles Array of role object ids
 * @prop {string} joined_at When the user joined the guild
 * @prop {string} [premium_since] When the user started boosting the guild
 * @prop {boolean} deaf Whether the user is deafened in voice channels
 * @prop {boolean} mute Whether the user is muted in voice channels
 * @prop {boolean} [pending] Whether the user has not yet passed the guild's Membership Screening requirements
 * @prop {string} [permissions] Total permissions of the member in the channel, including overrides, returned when in the interaction object
 */

/**
 * @typedef user
 * @prop {snowflake} id The user's id
 * @prop {string} username The user's username, not unique across the platform
 * @prop {string} discriminator The user's 4-digit discord-tag
 * @prop {string} [avatar] The user's avatar hash
 * @prop {boolean} [bot] Whether the user belongs to an OAuth2 application
 */

/**
 * @typedef role
 * @prop {snowflake} id Role id
 * @prop {string} name Role name
 * @prop {number} color Integer representation of hexadecimal color code
 * @prop {boolean} hoist If this role is pinned in the user listing
 * @prop {number} position Position of this role
 * @prop {string} permissions Permission bit set
 * @prop {boolean} managed Whether this role is managed by an integration
 * @prop {boolean} mentionable Whether this role is mentionable
 * @prop {object} [tags] The tags this role has
 * @prop {snowflake} [tags.bot_id] The id of the bot this role belongs to
 * @prop {snowflake} [tags.integration_id] The id of the integration this role belongs to
 * @prop {null} [tags.premium_subscriber] Whether this is the guild's premium subscriber role
 */

/**
 * @typedef channel
 * @prop {snowflake} id The id of this channel
 * @prop {number} type The type of channel
 * @prop {string} name The name of the channel (2-100 characters)
 * @prop {*} [permissions] ???
 */

/**
 * @typedef {ApplicationCommandOptionTypes} ApplicationCommandOptionType
 */

/**
 * @enum {number}
 */
const ApplicationCommandOptionTypes = {
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP: 2,
    STRING: 3,
    INTEGER: 4,
    BOOLEAN: 5,
    USER: 6,
    CHANNEL: 7,
    ROLE: 8
}

/**
 * @enum {number}
 */
const InteractionType = {
    Ping: 1,
    ApplicationCommand: 2
}

/**
 * Interaction 
 * @typedef Interaction 
 * @prop {snowflake} interaction.id Id of the interaction
 * @prop {snowflake} interaction.application_id Id of the application this interaction is for
 * @prop {InteractionType} interaction.type The type of interaction
 * @prop {ApplicationCommandInteractionData} [interaction.data] The command data payload
 * @prop {snowflake} [interaction.guild_id] The guild it was sent from
 * @prop {snowflake} [interaction.channel_id] The channel it was sent from
 * @prop {member} [interaction.member] Guild member data for the invoking user, including permissions
 * @prop {user} [interaction.user] User object for the invoking user, if invoked in a DM
 * @prop {string} interaction.token A continuation token for responding to the interaction
 * @prop {number} interaction.version Read-only property, always 1
 */

/**
 * @arg {import("../bot")} base
 * @arg {Interaction} interaction
 */
exports.handle = async function(base, interaction) {
    if(interaction.member.user.bot) return;

    else await base.commandHandler.executeCommand(interaction);
}