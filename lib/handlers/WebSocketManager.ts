const WebSocket = require('ws');
const {OPCODES, PAYLOADS, GATEWAY} = require("../constants");

module.exports = class WebSocketManager{
        
    constructor(client){
        this.client = client;
        this.token = client.token;
        this.gateway = null;
        this.sequence_number = null;
        this.session_id = null;
        this.lastHeartbeatSent = null;
        this.lastHeartbeatACK = false;
        this.pulse = null;
    }

    connect(){
        this.gateway = new WebSocket(GATEWAY);
        this.lastHeartbeatACK = true;
        this.gateway.on("message", payload => this.recieve(JSON.parse(payload)));
        this.client.debugLog(`Connected`);
    }

    disconect(reconnect){
        if(!this.gateway){return;}

        this.gateway.close();
        this.gateway = null;
        this.reset();

        this.client.debugLog(`Disconnected`, true);

        if(reconnect){
            this.connect();
        }
    }

    recieve(payload){
        const {op, d, s} = payload;
        this.sequence_number = s ?? this.sequence_number;

        switch(op){
            case OPCODES.DISPATCH:
                this.client.eventHandler.handleDispatch(payload);
                break;
            case OPCODES.HEARTBEAT:
                this.heartbeat();
                break;
            case OPCODES.RECONNECT:
                this.disconect(true);
                break;
            case OPCODES.INVALID_SESSION:
                this.sequence_number = 0;
                this.session_id = null;
                this.identify();
                break;
            case OPCODES.HELLO:
                const {heartbeat_interval} = d;
                if(this.pulse){clearInterval(this.pulse);}
                this.pulse = setInterval(() => {this.heartbeat(true)}, heartbeat_interval);

                if(this.session_id) this.resume();
                else this.identify();
                break;
            case OPCODES.HEARTBEAT_ACKNOWLEDGEMENT:
                this.lastHeartbeatACK = true;
                this.client.debugLog(`Heartbeat acknowledged in ${Date.now() - this.lastHeartbeatSent} ms`);
                break;
            default:
                this.client.debugLog(`UNKNOWN OPCODE: ${op}`);
                console.log(payload);
                break;
        }
    }

    heartbeat(pulse){
        if(pulse) {
            if(!this.lastHeartbeatACK){
                this.disconect(true);
            }
            this.lastHeartbeatACK = false;
        }
        this.lastHeartbeatSent = Date.now();
        this.gateway.send(PAYLOADS.HEARTBEAT(this.sequence_number));
    }

    identify(){
        this.gateway.send(PAYLOADS.IDENTIFY(this.token));
    }

    resume(){
        this.gateway.send(PAYLOADS.RESUME(this.token, this.session_id, this.sequence_number));
    }

    reset(){
        if(this.pulse){
            clearInterval(this.pulse);
            this.pulse = null;
        }
        this.lastHeartbeatSent = null;
        this.lastHeartbeatACK = false;
    }

}