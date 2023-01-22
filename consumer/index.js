require('dotenv').config();

const ip = require('ip')
const {Kafka, logLevel} = require('kafkajs')
const host = process.env.KAFKA_HOST || ip.address()

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`${host}:9092`],
  clientId: 'kafka-poc-consumer',
})

const topic = process.env.KAFKA_TOPICS
const consumer = kafka.consumer({groupId: 'kafka-poc-group'})

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({topic, fromBeginning: true})
  await consumer.run({
    eachMessage: async ({topic, partition, message}) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`- ${prefix} ${message.key}#${message.value}`)
    },
  })
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

const {DISCONNECT} = consumer.events
const removeListener = consumer.on(DISCONNECT, e => {
  console.log(`DISCONNECT at ${e.timestamp}`)
})

errorTypes.forEach(type => {
  process.on(type, async e => {
    try {
      console.log(`process.on ${type}`)
      console.error(e)
      await consumer.disconnect()
      process.exit(0)
    } catch (_) {
      process.exit(1)
    } finally {
      removeListener()
    }
  })
})

signalTraps.forEach(type => {
  process.once(type, async () => {
    try {
      await consumer.disconnect()
    } finally {
      removeListener()
      process.kill(process.pid, type)
    }
  })
})
