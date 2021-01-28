const fetch = require("node-fetch")

const URLS = {
    UsernameToUuid: (username) => `https://api.mojang.com/users/profiles/minecraft/${username}`,
    UuidToProfile: (uuid) => `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`,
    UuidToNames: (uuid) => `https://api.mojang.com/user/profiles/${uuid}/names`
};

async function GET(url){
    return await (await fetch(url)).json();
}

exports.getPlayerData = async function(data){
    const playerData = {
        "name": null,
        "names": null,
        "uuid": null,
    }

    if(data.name == "username"){
        const result = await TRY(GET(URLS.UsernameToUuid(data.value)), "Invalid username");
        if(result.error) return result.error;
        playerData.uuid = exports.addHyphens(result.id);
    } else {
        playerData.uuid = data.value;
    }

    const result = await TRY(GET(URLS.UuidToNames(playerData.uuid), "Invalid UUID"));
    if(result.error) return result.error;
    playerData.names = result;
    playerData.name = result[result.length - 1].name;
    
    return playerData;
}

exports.addHyphens = function(uuid){
    let s = uuid.match(/.{1,4}/g);
    return `${s[0]}${s[1]}-${s.slice(2, 5).join("-")}-${s.slice(5).join("")}`
}

async function TRY(callback, errorMsg){
    try {
        return await callback;
    } catch {
        return {error: errorMsg};
    }
}