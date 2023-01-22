class CreateAction {
    constructor({ kafkaProducerService }) {
        this._kafkaProducerService = kafkaProducerService
    }
    async execute(actionRequest) {
        const message = {
            key: `${actionRequest.id}`,
            value: Buffer.from(JSON.stringify(actionRequest))
        }

        console.log(`Sending message ${actionRequest.action}`)

        const messages = [ message ];
        await this._kafkaProducerService.send(messages)
    }
}

module.exports = CreateAction;
