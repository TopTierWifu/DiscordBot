module.exports = class EventHandler{
    
    constructor(client) {
        this.client = client;
    }

    async handleDispatch(payload){
        const {t, d} = payload;
    
        switch(t){
            case "READY":
                this.client.gateway.session_id = d.session_id;
                break;
            case "INTERACTION_CREATE":
                this.client.commandHandler.executeCheck(d);
                break;
            case "GUILD_CREATE":
                console.log(t);
                d.members.forEach(member => {
                    this.client.users.add(member.user);
                });
                break;
            default:
                break;
        }
    }

} 