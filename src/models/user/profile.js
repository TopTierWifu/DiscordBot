const ModelInterface = require("../ModelInterface");

module.exports = new ModelInterface({
  _id: String,
  helmet: {type: String, default: "<:hIcon:732820031372656721>"},
  chestplate: {type: String, default: "<:cIcon:732821083463614554>"},
  pants: {type: String, default: "<:pIcon:732822688258588765>"},
  weapon1: {type: String, default: "<:wIcon:732825599319605259>"},
  weapon2: {type: String, default: "<:wIcon:732825599319605259>"},
  accessory1: {type: String, default: "<:rIcon:732828071346044960>"},
  accessory2: {type: String, default: "<:nIcon:732983438298316951>"},
  accessory3: {type: String, default: "<:aIcon:732981186712043600>"},
  xp: {type: Number, default: 0},
  gold: {type: Number, default: 0},
  tile: {type: Number, default: 1},
  health: {type: Number, default: 5},
  defence: {type: Number, default: 0},
  strength: {type: Number, default: 2},
  attack_speed: {type: Number, default: 1},
  gold_find: {type: Number, default: 0},
  speed: {type: Number, default: 0},
  luck: {type: Number, default: 0},
  xp_gain: {type: Number, default: 0}
}, "profile", "profiles");