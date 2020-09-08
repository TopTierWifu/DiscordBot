exports.roll = function(item){
    switch(item.type){
        case 0:
            return exports.sides(item.sides);
        case 1:
            return exports.list(item.list);
        case 2:
            return exports.range(item.min, item.max);
    }
}

exports.sides = function(sides){    //Type 0
    return Math.ceil(Math.random() * sides);
}

exports.list = function(sides){     //Type 1
    return sides[Math.floor(Math.random() * sides.length)];
}

exports.range = function(min, max){ //Type 2
    return Math.floor(Math.random() * (max - min + 1) + min);
}