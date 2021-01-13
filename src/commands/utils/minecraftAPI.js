const fetch = require("node-fetch")

const URLS = {
    UsernameToUuid: (username) => `https://api.mojang.com/users/profiles/minecraft/${username}`,
    UuidToProfile: (uuid) => `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`,
    UuidToNames: (uuid) => `https://api.mojang.com/user/profiles/${uuid}/names`
};

async function GET(url){
    return await (await fetch(url)).json();
}

exports.getPlayerData = async function(username_uuid){
    let uuid = username_uuid;
    if(username_uuid.length < 3) {
        return {error: "Username too short!"}
    } else if(username_uuid.length <= 16){
        uuid = addHyphens((await GET(URLS.UsernameToUuid(username_uuid))).id);
    }

    return await GET(URLS.UuidToNames(uuid));
}

function addHyphens(uuid){
    let one = uuid.substr(0, 8);
    let two = uuid.substr(8, 4);
    let three = uuid.substr(12, 4);
    let four = uuid.substr(16, 4);
    let five = uuid.substr(20);
    return `${one}-${two}-${three}-${four}-${five}`;
}