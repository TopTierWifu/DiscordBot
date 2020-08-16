const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    _id: String,
    experience: {type: Number, default: 0},
});

module.exports = {name: 'Profile', schema: ProfileSchema};