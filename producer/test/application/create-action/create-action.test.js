const CreateAction = require('../../../application/create-action');

describe('create action use case', () => {
   let kafkaProducerServiceMock;
   let sut;
   let actionRequest;

   beforeEach(() => {
      kafkaProducerServiceMock = {
         send: jest.fn()
      };

      sut = new CreateAction({ kafkaProducerService: kafkaProducerServiceMock});

      actionRequest = {
         id: '5ed4e0fd385b75ad664e66d2',
         action: 'action1'
      };
   });

   it('should send kafka message correctly', async () => {
      const expectedMessage = {
         key: actionRequest.id,
         value: actionRequest
      }
      await sut.execute(actionRequest);

      expect(kafkaProducerServiceMock.send.mock.calls.length).toBe(1);
      expect(kafkaProducerServiceMock.send.mock.calls[0][0]).toStrictEqual(expectedMessage);
   });
});
