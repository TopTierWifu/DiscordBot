const Base = require("./Base");
const User = require("./User");

module.exports = class Presence extends Base{

    constructor(data){
        super(data.user.id);
        this.user = new User(data.user);
        this.status = data.status;
    }

    update(data){
        if(data.status !== undefined) {
            this.status = data.status;
        }
    }

    toString(){
        return this.user.mention;
    }

}