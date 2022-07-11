const awilix = require('awilix');

const mongoDbHandler = require('./infrastructure/persistance/mongo/db-handler');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    mongoDbHandler: awilix.asFunction(mongoDbHandler),
});

module.exports = container;