const MATH = require("./math");

/**
 * @typedef {import("../typings/loottable").LootTable} LootTable
 * @typedef {import("../typings/loottable").NumberProvider} NumberProvider
 * @typedef {import("../typings/loottable").Entry} Entry
 */

/**@arg {LootTable} lootTable */
async function getResult(lootTable){
    const loot = {};

    for(const pool of lootTable.pools){
        const rolls = await getNumberProvider(pool.rolls);

        for(let i = 0; i < rolls; i++) {
            const entry = await getEntries(pool.entries);
            if(!loot[entry.name]){
                loot[entry.name] = 1;
            } else {
                loot[entry.name]++;
            }
        }

    }

    return loot;
}

/**@arg {NumberProvider} numP */
async function getNumberProvider(numP) {
    /**@type {number} */
    let rolls;

    if(typeof numP == "number"){
        rolls = numP;
    } else {
        switch(numP.type){
            case "binomial": 
                let sum = 0;

                for (let i = 0; i <= numP.n; i++) {
                    if(await MATH.random() <= numP.p) {
                        sum++;
                    }
                }

                rolls = sum;
            break;
            case "uniform": 
                rolls = await MATH.random(numP.min, numP.max);
            break;
        }
    }

    return rolls;
}

/**@arg {Entry[]} entries */
async function getEntries(entries){
    let totalWeight = 0;

    for(const entry of entries){
        totalWeight += entry.weight; // * entry.quality
    }

    let rand = await MATH.random(1, totalWeight);
    let cumulativeSum = 0;

    for(const entry of entries){
        cumulativeSum += entry.weight;
        if(rand <= cumulativeSum){
            return entry;
        }
    }
}

function getLootTableOdds(){

}

/**
 * @type {LootTable}
 */
const x = {
    type: "sdas",
    pools: [
        {
            rolls: {
                type: "binomial",
                n: 100,
                p: 0.9
            },
            entries: [
                {
                    name: "test",
                    type: "test",
                    weight: 30
                },
                {
                    name: "iron",
                    type: "metal",
                    weight: 10
                },
                {
                    name: "gold",
                    type: "metal",
                    weight: 10
                },
                {
                    name: "steel",
                    type: "metal",
                    weight: 10
                },
            ]
        },
        {
            rolls: {
                type: "uniform",
                min: 0,
                max: 10
            },
            entries: [
                {
                    name: "apple",
                    type: "fruit",
                    weight: 5
                },
                {
                    name: "banana",
                    type: "fruit",
                    weight: 1
                },
                {
                    name: "orange",
                    type: "fruit",
                    weight: 1
                },
                {
                    name: "kiwi",
                    type: "fruit",
                    weight: 1
                },
            ]
        }
    ]
};


(async () => {

    // const n = 170;

    let start = Date.now();
    // const buckets = {};

    // for (let index = 0; index < 10000; index++) {
    //     let res = await getNumberProvider({type: "binomial", n: 100, p: 0.6667}); 
    //     buckets[res] ? buckets[res]++ : buckets[res] = 1;
    // }
    console.log(`${JSON.stringify(await getResult(x), null, 3)} in ${Date.now()-start}ms`);

    // binomial(6, 10, .5)
    // const loot = await collapseLootTableResult(x);
    // console.log(loot);
})();