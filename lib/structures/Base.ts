export abstract class Base{

    id: any;
    createdAt: Date;
    createdAtFormatted: string;

    constructor(id: any){
        this.id = id;
        this.createdAt = new Date(Math.floor(this.id/4194304) + 1420070400000);
        this.createdAtFormatted = `${this.createdAt.toDateString()} ${this.createdAt.toLocaleString("en-US", {timeStyle: "short"})}`;
    }

}