exports.handle = function(msg){

    //Ignore if the sender is a bot
    if(msg.author.bot) {return;}

    //Pass it on to the command handler to do command checks
    else this.commandHandler.execute(msg);
}