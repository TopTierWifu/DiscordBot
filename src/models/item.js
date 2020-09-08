const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    _id: String,    //base36ID
    index: Number,  //base10ID for purposes of sorting
    type: Number,   //die type id
    sides: Number,  //type 0: die with "x" number of sides
    list: [Number], //type 1: die that chooses a random # from an array
    min: Number,    //type 2: mininum range of numbers (can be 0 and negative)
    max: Number,    //type 2: maxinum range of numbers (can be 0 and negative)
});

module.exports = { name: 'Item', schema: ItemSchema };