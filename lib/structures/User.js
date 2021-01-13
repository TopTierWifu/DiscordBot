module.exports = class User {

    constructor(){
        this.id = 0;
    }

    createdAt(){
        return (this.id/4194304) + 1420070400000;
    }

}