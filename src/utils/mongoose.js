const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const requireDir = require('require-dir');
const dir = requireDir("../models");

db.on('error', console.error);  //On error, log error (duh)
db.once('open', function() {    //On connection, log connection
	console.log(`Mongoose connection successfully opened!`);
});


class Mongo {
	constructor(){
        this.db = db;
		for (let i in dir) {    //For each file in the models folder
			const Schema = dir[i];  //Get the exported object {name: "name", schema: "Schema"}
			this[Schema.name] = mongoose.model(Schema.name, Schema.schema);
		}
	}
}

module.exports = Mongo;