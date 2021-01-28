import { Base } from "./Base";

export class CommandInterface extends Base{

    cooldown: number;
    syntax: any;
    execute: any;

	constructor(args){
        super(args.id);
        this.cooldown = args.cooldown;
        this.syntax = args.syntax
        this.execute = args.execute;
    }

}