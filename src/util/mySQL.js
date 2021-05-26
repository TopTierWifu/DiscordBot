const mySQL = require("mysql");
const auth = require("../../../tokens/mysql-auth.json");

const POOL = mySQL.createPool(auth);

/** 
* @arg {string} query 
* @arg {*[]} variables 
*/
exports.query = async (query, variables = []) => {
	return new Promise((resolve, reject) => {
		POOL.query(query, variables, function (err, rows) {
			if (err) reject(err);
			resolve(rows);
		});
	});
}