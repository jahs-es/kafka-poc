const {Kafka, logLevel, CompressionTypes} = require("kafkajs");
const ip = require('ip')

class KafkaProducerService {
  async _getProducer() {
    if (!this._kafkaClientProducer) {
      this._kafkaClientProducer = await this._getKafkaClient().producer();
    }
    return this._kafkaClientProducer;
  }

  _getKafkaClient() {
    if (!this._kafkaClient) {
      this._kafkaClient = new Kafka({
        logLevel: logLevel.ERROR,
        brokers: [`${ip.address()}:9092`],
        clientId: 'kafka-poc-producer',
      })
    }
    return this._kafkaClient;
  }

  async send(messages) {
    const topic = process.env.KAFKA_TOPICS

    const producer = await this._getProducer();
    await producer.connect();
    await producer.send({
      topic,
      compression: CompressionTypes.GZIP,
      messages
    })
    .then(console.log)
    .catch(e => {
      console.error(`[example/producer] ${e.message}`, e)
    })

    await producer.disconnect()
  }
}

module.exports = KafkaProducerService;
