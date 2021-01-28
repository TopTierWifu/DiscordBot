module.exports = class Collection extends Map{

    constructor(baseClass){
        super();
        this.baseClass = baseClass;
    }

    add(object, extra){
        if(!(object instanceof this.baseClass || object.constructor.name === this.baseClass.name)){
            object = new this.baseClass(object, extra);
        }

        this.set(object.id, object);

        return object;
    }

    update(object, extra){
        const value = this.get(object.id);
        if(!value){
            return this.add(object, extra);
        }
        value.update(object, extra);
        return value;
    }

    remove(object){
        const value = this.get(object.id);
        if(!value){
            return null;
        }
        this.delete(object.id);
        return value;
    }

    toString(){
        return `[Collection<${this.baseClass.name}>]`;
    }

}