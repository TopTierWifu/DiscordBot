/**
 * @typedef {import("../typings/bot").Main} Main 
 * @typedef {import("../typings/interaction").Interaction} Interaction 
 */

/**
 * @arg {Main} base
 * @arg {Interaction} interaction
 */
exports.handle = async function (base, interaction) {
    if (interaction.member.user.bot) return;

    else await base.commandHandler.executeCommand(interaction);
}