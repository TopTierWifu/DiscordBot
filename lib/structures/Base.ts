export abstract class Base{

    id: any;
    createdAt: Date;
    createdAtFormatted: string;

    constructor(id: any){
        this.id = id;
        this.createdAt = new Date(Math.floor(this.id/4194304) + 1420070400000);
        this.createdAtFormatted = this.formatDate(this.createdAt);
    }

    formatDate(date: Date): string{
        return `${date.toDateString()} ${date.toLocaleString("en-US", {hour: "numeric", minute: "2-digit"})}`;
    }

}