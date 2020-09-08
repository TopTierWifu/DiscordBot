const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    _id: String,
    rolls: {type: Number, default: 0},
    items: {type: [String], default: []},
});

module.exports = {name: 'Profile', schema: ProfileSchema};