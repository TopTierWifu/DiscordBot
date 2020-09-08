const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    _id: String,
    rolls: {type: Number, default: 0},
    equipment: {type: [String], default: []},
});

module.exports = {name: 'Profile', schema: ProfileSchema};