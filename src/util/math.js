const csprng = require("random-number-csprng");

/**
 * @arg {number} [min] 
 * @arg {number} [max] 
 */
exports.random = async (min, max) => {
    if (min == undefined || max == undefined) {
        return await csprng(0, 1000000) / 1000000;
    } else {
        return await csprng(min, max);        
    }
}

/**
 * @arg {number} n 
 * @arg {number} [multiplier] 
 */
exports.factorial = (n, multiplier = 1) => {
    while (n > 0) multiplier *= n--;
    return multiplier;
}

/**
 * @arg {number} x Number of sucesses within n trials
 * @arg {number} n Number of trials
 * @arg {number} p Probability of success on a single trial
 */
exports.binomial = (x, n, p) => {
    const choose = exports.factorial(n) / (exports.factorial(n - x) * exports.factorial(x));
    return choose * (p ** x) * ((1 - p) ** (n - x));
}
