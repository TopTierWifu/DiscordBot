import fetch from "node-fetch";

const URLS = {
    UsernameToUuid: (username: string) => `https://api.mojang.com/users/profiles/minecraft/${username}`,
    UuidToProfile: (uuid: string) => `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`,
    UuidToNames: (uuid: string) => `https://api.mojang.com/user/profiles/${uuid}/names`
};

async function GET(url: string){
    return await (await fetch(url)).json();
}

export async function getPlayerData(data: any){
    const playerData = {
        name: "",
        names: "",
        uuid: "",
    }

    if(data.name == "username"){
        const result = await TRY(GET(URLS.UsernameToUuid(data.value)), "Invalid username");
        if(result.error) return result.error;
        playerData.uuid = exports.addHyphens(result.id);
    } else {
        playerData.uuid = data.value;
    }

    const result = await TRY(GET(URLS.UuidToNames(playerData.uuid)), "Invalid UUID");
    if(result.error) return result.error;
    playerData.names = result;
    playerData.name = result[result.length - 1].name;
    
    return playerData;
}

export function addHyphens(uuid: string){
    const s: any = uuid.match(/.{1,4}/g);
    return `${s[0]}${s[1]}-${s.slice(2, 5).join("-")}-${s.slice(5).join("")}`
}

async function TRY(callback: any, errorMsg: any){
    try {
        return await callback;
    } catch {
        return {error: errorMsg};
    }
}