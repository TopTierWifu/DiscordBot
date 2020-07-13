const mongoose = require('mongoose');

module.exports = {
    async init(password) {
        mongoose.connect('mongodb+srv://wifu_bot:'+password+'@discordbot.pto6n.mongodb.net/wifu_bot', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connection successfully opened!');
        });
        
        mongoose.connection.on('err', err => {
            console.error(`Mongoose connection error: \n ${err.stack}`);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection disconnected');
        });
    }
};