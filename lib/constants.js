const OPCODES = {
    "DISPATCH": 0,                  //Receive
    "HEARTBEAT": 1,                 //Send & Receive
    "IDENTIFY": 2,                  //Send
    "PRESENCE_UPDATE": 3,           //Send
    "VOICE_STATE_UPDATE": 4,        //Send
    "RESUME": 6,                    //Send
    "RECONNECT": 7,                 //Receive
    "REQUEST_GUILD_MEMBERS": 8,     //Send
    "INVALID_SESSION": 9,           //Receive
    "HELLO": 10,                    //Receive
    "HEARTBEAT_ACKNOWLEDGEMENT": 11 //Receive
}

const PAYLOADS = {
    "HEARTBEAT": (sequence_number) => {
        return JSON.stringify({
            "op": OPCODES.HEARTBEAT, 
            "d": sequence_number
        })
    },
    "IDENTIFY": (token) => {
        return JSON.stringify({
            "op": OPCODES.IDENTIFY, 
            "d": {
                "token": token,
                "intents": 768,
                "properties": {
                    "$os": process.platform,
                    "$browser": "wifu_library",
                    "$device": "wifu_library"
                }
            }
        })
    },
    "RESUME": (token, session_id, sequence_number) => {
        return JSON.stringify({
            "op": OPCODES.RESUME,
            "d": {
                "token": token,
                "session_id": session_id,
                "seq": sequence_number
            }
        })
    }
}

const GATEWAY = "wss://gateway.discord.gg/?v=8&encoding=json"

const REST_API = "https://discord.com/api/v8";

const ENDPOINTS = {
    "GET_USER": (id) => {
        return {
            url: `${REST_API}/users/${id}`,
        }
    },
    "GET_GUILD_MEMBER": (guild_id, id) => {
        return {
            url: `${REST_API}/guilds/${guild_id}/members/${id}`
        }
    },
    "CREATE_INTERACTION_RESPONSE": (interaction_id, interaction_token) => {
        return {
            url: `${REST_API}/interactions/${interaction_id}/${interaction_token}/callback`,
            method: `POST`
        }
    },
    "CREATE_MESSAGE": (channel_id) => {
        return {
            url: `${REST_API}/channels/${channel_id}/messages`,
            method: `POST`
        }
    },
    "DELETE_MESSAGE": (channel_id, message_id) => {
        return {
            url: `${REST_API}/channels/${channel_id}/messages/${message_id}`,
            method: `DELETE`
        }
    },
    "EDIT_MESSAGE": (channel_id, message_id) => {
        return {
            url: `${REST_API}/channels/${channel_id}/messages/${message_id}`,
            method: `PATCH`
        }
    }
}

module.exports = {
    OPCODES,
    PAYLOADS,
    GATEWAY,
    ENDPOINTS
}