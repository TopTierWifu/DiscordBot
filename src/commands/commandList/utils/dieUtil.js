exports.sides = function(sides){
    return Math.ceil(Math.random() * sides);
}

exports.list = function(sides){
    return sides[Math.floor(Math.random() * sides.length)];
}

exports.range = function(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}