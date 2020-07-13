const ModelInterface = require("./ModelInterface");

module.exports = new ModelInterface({
  _id: String,
  square: {
    type: Number,
    default: 0
  },
  heart: {
    type: Number,
    default: 0
  },
  circle: {
    type: Number,
    default: 0
  },
  diamond: {
    type: Number,
    default: 0
  },
  triangle: {
    type: Number,
    default: 0
  },
  star: {
    type: Number,
    default: 0
  }
}, "inventory", "inventories");