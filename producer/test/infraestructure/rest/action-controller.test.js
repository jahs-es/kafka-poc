const createActionMock = {
    execute: () => {}
};

const container = require('../../../container');
const awilix = require('awilix');
container.register({
    createAction: awilix.asValue(createActionMock)
});

const { app, server } = require('../../../index');
const supertest = require('supertest');
const request = supertest(app);

describe('action controller', () => {
    describe('POST action', () => {
        test('should return 422 status when creating an action without any of its values', async () => {
            const res = await request.post('/actions')
                .send({});

            const expectedErrors = [
                { message: 'Field cannot be blank', field: 'id' },
                { message: 'Field cannot be blank', field: 'action' }
            ]

            const { status, body, headers } = res;
            expect(status).toBe(422);
            expect(body).toEqual({ errors: expectedErrors });
            expect(headers['content-type']).toContain('application/json');
        });

        test('should return 201 status when creating an action correctly', async () => {
            createActionMock.execute = () => {};

            const res = await request.post('/actions')
                .send({
                    id: 'id',
                    action: 'action'
                });

            const { status } = res;
            expect(status).toBe(201);
        });
    });

    afterAll(async () => {
        await server.close();
    });
});
