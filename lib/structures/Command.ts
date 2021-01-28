import { Base } from "./Base";

export class CommandInterface extends Base{

	constructor(args){
        super(args.id);
        this.cooldown = args.cooldown;
        this.syntax = args.syntax
        this.execute = args.execute;
    }

}