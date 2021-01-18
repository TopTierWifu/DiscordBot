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
            default:
        }
    }

}