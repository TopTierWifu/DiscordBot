let highestIndex;

exports.addItem = async function(p, type, data){
    if(!highestIndex) {await initHighestIndex(p);}

    let index = highestIndex++;

    switch(type){
        case 0:
            await p.db.Item.create({_id: index.toString(36), index: index, type: type,
                sides: data
            });
            break;
        case 1:
            await p.db.Item.create({_id: index.toString(36), index: index, type: type,
                list: data
            });
            break;
        case 2:
            await p.db.Item.create({_id: index.toString(36), index: index, type: type,
                min: data[0],
                max: data[1]
            });
            break;
    }

    await p.db.Profile.updateOne(
        {_id: p.sender.id},
        {$push: {items: index.toString(36)}},
        {upsert: true}
    );

    return index;
}

exports.getItemPreview = async function(p, id){
    let item = await p.db.Item.findById(id);
    switch(item.type){
        case 0:
            return "`" + id + "` :game_die: `d[" + item.sides + "]`";
        case 1:
            return "`" + id + "` :game_die: `c[" + item.list.toString() + "]`";
        case 2:
            return "`" + id + "` :game_die: `r[" + item.min + "," + item.max + "]`";
    }
}

async function initHighestIndex(p){
    highestIndex = (await p.db.Item.find({}).sort({index: "-1"}).limit(1))[0]?.index ?? 1297;
    if(highestIndex != 1297) highestIndex++;
}