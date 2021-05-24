/**
 * @typedef {import("./bot").Snowflake} Snowflake
 * @typedef {import("./command").ApplicationCommandOptionType} ApplicationCommandOptionType
 */

/**
 * @typedef {object} Interaction 
 * @prop {Snowflake} id Id of the interaction
 * @prop {Snowflake} application_id Id of the application this interaction is for
 * @prop {1 | 2} type 1 for Ping, 2 for ApplicationCommand
 * @prop {ApplicationCommandInteractionData} [data] The command data payload
 * @prop {Snowflake} [guild_id] The guild it was sent from
 * @prop {Snowflake} [channel_id] The channel it was sent from
 * @prop {member} [member] Guild member data for the invoking user, including permissions
 * @prop {user} [user] User object for the invoking user, if invoked in a DM
 * @prop {string} token A continuation token for responding to the interaction
 * @prop {number} version Read-only property, always 1
 */

/**
 * @typedef {object} ApplicationCommandInteractionData
 * @prop {Snowflake} id The ID of the invoked command
 * @prop {string} name The name of the invoked command
 * @prop {ApplicationCommandInteractionDataResolved} resolved Converted users + roles + channels
 * @prop {ApplicationCommandInteractionDataOption[]} options The params + values from the user
 */

/**
 * @typedef ApplicationCommandInteractionDataOption
 * @prop {string} name The name of the parameter
 * @prop {ApplicationCommandOptionType} type SUB_COMMAND: 1, SUB_COMMAND_GROUP: 2, STRING: 3, INTEGER: 4, BOOLEAN: 5, USER: 6, CHANNEL: 7, ROLE: 8
 * @prop {*} [value] The value of the pair (name, type)
 * @prop {ApplicationCommandInteractionDataOption[]} [options] Present if this option is a group or subcommand
 */

/**
 * @typedef {object} ApplicationCommandInteractionDataResolved
 * @prop {Object.<string, user>} [users] The IDs and User objects
 * @prop {Object.<string, Omit<member, "user" | "deaf" | "mute">>} [members] The IDs and partial Member objects
 * @prop {Object.<string, role>} [roles] The IDs and Role objects
 * @prop {Object.<string, channel>} [channels] The IDs and partial Channel objects
 */

/**
 * @typedef member
 * @prop {user} [user] The user this guild member represents
 * @prop {string} [nick] This users guild nickname
 * @prop {Snowflake[]} roles Array of role object ids
 * @prop {string} joined_at When the user joined the guild
 * @prop {string} [premium_since] When the user started boosting the guild
 * @prop {boolean} deaf Whether the user is deafened in voice channels
 * @prop {boolean} mute Whether the user is muted in voice channels
 * @prop {boolean} [pending] Whether the user has not yet passed the guild's Membership Screening requirements
 * @prop {string} [permissions] Total permissions of the member in the channel, including overrides, returned when in the interaction object
 * @deprecated @prop {boolean} [is_pending] DEPRECATED: Replaced by "pending" property
 */

/**
 * @typedef user
 * @prop {Snowflake} id The user's id
 * @prop {string} username The user's username, not unique across the platform
 * @prop {string} discriminator The user's 4-digit discord-tag
 * @prop {string} [avatar] The user's avatar hash
 * @prop {boolean} [bot] Whether the user belongs to an OAuth2 application
 * @prop {number} [public_flags] The public flags on a user's account
 */

/**
 * @typedef role
 * @prop {Snowflake} id Role id
 * @prop {string} name Role name
 * @prop {number} color Integer representation of hexadecimal color code
 * @prop {boolean} hoist If this role is pinned in the user listing
 * @prop {number} position Position of this role
 * @prop {string} permissions Permission bit set
 * @prop {boolean} managed Whether this role is managed by an integration
 * @prop {boolean} mentionable Whether this role is mentionable
 * @prop {object} [tags] The tags this role has
 * @prop {Snowflake} [tags.bot_id] The id of the bot this role belongs to
 * @prop {Snowflake} [tags.integration_id] The id of the integration this role belongs to
 * @prop {null} [tags.premium_subscriber] Whether this is the guild's premium subscriber role
 */

/**
 * @typedef channel
 * @prop {Snowflake} id The id of this channel
 * @prop {number} type The type of channel
 * @prop {string} name The name of the channel (2-100 characters)
 * @prop {*} [permissions] ???
 */

export {};