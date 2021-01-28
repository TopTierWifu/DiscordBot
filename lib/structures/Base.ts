module.exports = class Base {

    constructor(id){
        this.id = id;
        this.createdAt = new Date(Math.floor(this.id/4194304) + 1420070400000);
        this.createdAtFullTimeStamp = `${this.createdAt.toDateString()} ${this.createdAt.toLocaleString("en-US", {timeStyle: "short"})}`;
    }

}