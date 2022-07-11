const container = require('../container');
const signals = ['SIGTERM', 'SIGINT'];

function registerGracefulStopper() {
    const dbHandler = container.resolve('mongoDbHandler');
    signals.map(signal => process.on(signal, () => {
        dbHandler.disconnect();
        process.exit();
    }));

}

module.exports = {registerGracefulStopper}