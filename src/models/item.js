const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    _id: String,
    index: Number,
    itemID: String,
    quality: String,
});

module.exports = { name: 'Item', schema: ItemSchema };

// {
//     _id: base36ID,
//     index: base10ID for purposes of sorting,
//     itemID: From item list (items.json),
//     quality: From quality list (items.json),
// }