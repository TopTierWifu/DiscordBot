export class EventHandler{
    
    constructor(client) {
        this.client = client;
    }

    async handleDispatch(payload){
        const {t, d} = payload;
    
        switch(t){
            case "READY":{
                this.client.gateway.session_id = d.session_id;
                break;}
            case "GUILD_CREATE":{
                this.client.guilds.add(d);
                break;}
            case "GUILD_UPDATE":{
                this.client.guilds.update(d);
                break;}
            case "GUILD_DELETE":{
                this.client.guilds.remove(d);
                break;}
            case "GUILD_ROLE_CREATE":{
                const guild = this.client.guilds.get(d.guild_id);
                guild.createRole(d.role);
                break;}
            case "GUILD_ROLE_UPDATE":{
                const guild = this.client.guilds.get(d.guild_id);
                guild.updateRole(d.role);
                break;}
            case "GUILD_ROLE_DELETE":{
                const guild = this.client.guilds.get(d.guild_id);
                guild.deleteRole({id: d.role_id});
                break;}
            case "GUILD_MEMBER_ADD":{
                const guild = this.client.guilds.get(d.guild_id);
                guild.addMember(d);
                break;}
            case "GUILD_MEMBER_UPDATE":{
                const guild = this.client.guilds.get(d.guild_id);
                guild.updateMember(d);
                break;}
            case "GUILD_MEMBER_REMOVE":{
                const guild = this.client.guilds.get(d.guild_id);
                guild.deleteMember(d.user);
                break;}
            case "PRESENCE_UPDATE":{
                const guild = this.client.guilds.get(d.guild_id);
                guild.updatePresence(d);
                break;}
            case "INTERACTION_CREATE":{
                this.client.commandHandler.executeCheck(d);
                break;}
            default:{
                break;}
        }
    }

} 