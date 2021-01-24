module.exports = class Base {

    constructor(id){
        this.id = id;
        this.createdAt = Date.now(Math.floor(this.id/4194304) + 1420070400000);
    }

}