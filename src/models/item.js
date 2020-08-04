const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    _id: String,
    itemID: String,
    rarity: String,
    reforge: String
});

module.exports = { name: 'Item', schema: ItemSchema };