const awilix = require('awilix');
const kafkaProducerService = require('./infraestructure/kafka-producer-service');
const createAction = require('./application/create-action');
const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    kafkaProducerService:awilix.asClass(kafkaProducerService),
    createAction:awilix.asClass(createAction)
});

module.exports = container;
