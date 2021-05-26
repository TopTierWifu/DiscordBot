/**
 * @typedef {object} LootTable
 * @prop {string} type
 * @prop {Pool[]} pools A list of all pools for this loot table. Each pool used generates items from its list of items based on the number of rolls. Pools are applied in order.
 */

/**
 * @typedef {object} Pool
 * @prop {NumberProvider} rolls Specifies the number of rolls on the pool.
 * @prop {NumberProvider} [bonus_rolls] Specifies the number of bonus rolls on the pool per point of luck. Rounded down after multiplying.
 * @prop {Entry[]} entries A list of all things that can be produced by this pool. One entry is chosen per roll as a weighted random selection from all entries without failing conditions.
 */

/**
 * @typedef {Uniform | Binomial | number} NumberProvider
 */

/**
 * @typedef {object} Uniform A random number following a uniform distribution between two values (inclusive).
 * @prop {"uniform"} type A random number following a uniform distribution between two values (inclusive).
 * @prop {number} min Number provider. The minimum value.
 * @prop {number} max Number provider. The maximum value.
 */

/**
 * @typedef {object} Binomial A random number following a binomial distribution.
 * @prop {"binomial"} type A random number following a uniform distribution between two values (inclusive).
 * @prop {number} n Number provider. The amount of trials.
 * @prop {number} p Number provider. The probability of success on an individual trial.
 */

/**
 * @typedef {object} Entry
 * @prop {string} type
 * @prop {string} name
 * @prop {number} weight Determines how often this entry is chosen out of all the entries in the pool. Entries with higher weights are used more often (chance is this entry's weight⁄total of all considered entries' weights).
 */

/**
 * Add to entry when luck is added 
 * {number} [quality] WIP Modifies the entry's weight based on the player's luck attribute. Formula is floor( weight + (quality * luck)).
 */

export {};