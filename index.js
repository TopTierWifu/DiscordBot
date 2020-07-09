const config = require('./config.json');
const Sharder = require('eris-sharder').Master;

(async () => {
	try{
        const sharder = new Sharder(config.token, config.sharder.path, {
            name: config.sharder.name,
            clientOptions: config.eris.clientOptions,
        });
    }catch(e){
    console.error(e);
    }
})();