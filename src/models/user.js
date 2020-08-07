const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: String,
    Helmet: String,
    Chestplate: String,
    Pants: String,
    Weapon: [String],
    Accessory: [String],
    items: [String],
    xp: {type: Number, default: 0},
    gold: {type: Number, default: 0},
    tile: {type: Number, default: 1},
    tileProgress: {type: Number, default: 0},
    bestTile: {type: Number, default: 1},
    health: {type: Number, default: 5},
    defense: {type: Number, default: 0},
    strength: {type: Number, default: 2},
    crit_chance: {type: Number, default: 1},
    crit_damage: {type: Number, default: 1},
    gold_find: {type: Number, default: 0},
    speed: {type: Number, default: 0},
    luck: {type: Number, default: 0},
    xp_gain: {type: Number, default: 0},
    index: [String]
});

module.exports = { name: 'User', schema: UserSchema };