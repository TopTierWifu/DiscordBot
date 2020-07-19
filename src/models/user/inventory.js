const ModelInterface = require("../ModelInterface");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  icon: String,
  amount: Number
})

module.exports = new ModelInterface({
  _id: String,
  helmet: [itemSchema],
}, "inventory", "inventories");