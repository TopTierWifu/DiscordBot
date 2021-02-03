const mysql2 = require("mysql2");
const {Client} = require("ssh2");
const sshClient = new Client();
const {LOGIN: {DB, SSH, FORWARD: FW}} = require("../../secret.json");

/**
 * Manages requests to the database
 */
class SQLManager{
	constructor(debug){
		//https://akanksha.io/post/node-js-how-to-access-mysql-remotely-using-ssh
		this.dbConnection = !debug ? mysql2.createPool(DB) : new Promise((resolve, reject) => {
			sshClient.on('ready', () => {
				sshClient.forwardOut(FW.srcIP, FW.srcPort, FW.dstIP, FW.dstPort,
					(err, stream) => {
						if (err) reject(err);
						const updatedDB = {...DB, stream};
						try {
							const pool = mysql2.createPool(updatedDB);
							resolve(pool);
						} catch (error) {
							reject(error);
						}
					}
				);
			}).connect(SSH);
		});
	}

	async query(query, variables = []){
		const pool = await this.dbConnection;
		return new Promise((resolve, reject) => {
			pool.query(query, variables, function(err, rows) {
				if(err) reject(err);
				resolve(rows);
			});
		});
	}

}

module.exports = SQLManager;