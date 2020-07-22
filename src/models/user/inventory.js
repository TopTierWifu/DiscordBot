const ModelInterface = require("../ModelInterface");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new ModelInterface({
  _id: String,
  items: [String],
}, "inventory", "inventories");