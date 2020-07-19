const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = class ModelInterface{

	constructor(schema, name, collection){
        this.schema = new Schema(schema);
        this.model = mongoose.model(name, this.schema, collection);
    }

    async get(id, data){
        return await this.model.findById(id).then(
            async (doc) =>{
                if(doc){
                    return doc;
                }
                if(isEmpty(data)){
                    doc = await new this.model({
                        _id: id
                    });
                } else {
                    doc = await new this.model(data);
                }
                return doc;
            }
        );
    }
}

function isEmpty(data){
    for(let key in data) {
        if(data.hasOwnProperty(key))
            return false;
    }
    return true;
}