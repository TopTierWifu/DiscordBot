const mySQL = require("mysql");
const auth = require("../../../tokens/mysql-auth.json");

module.exports = class MySQLManager{
	constructor(){
		this.pool = mySQL.createPool(auth);
	}

    /** 
     * @param {string} query 
     * @param {*[]} variables 
     */
	async query(query, variables = []){
		return new Promise((resolve, reject) => {
			this.pool.query(query, variables, function(err, rows) {
				if(err) reject(err);
				resolve(rows);
			});
		});
	}

}