const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = class ModelInterface{

	constructor(schema, name, collection){
        this.schema = new Schema(schema);
        this.model = mongoose.model(name, this.schema, collection);
    }

    async get(id){
        return await this.model.findById(id).then(
            async (doc) =>{
                if(doc){
                    return doc;
                }
                doc = await new this.model({
                    _id: id
                });
                doc.save();
                return doc;
            }
        );
    }

    async set(id, key, value){
        let doc = await this.get(id);
        doc[key] = value;
        await doc.save();
    }
}