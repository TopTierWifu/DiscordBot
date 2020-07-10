const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  wifuID: String,
  hearts: {
    type: Number,
    default: 0
  },
  squares: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Inventory", inventorySchema)