require('dotenv').config();

const { server: { port } } = require('./infraestructure/config');
const express = require('express');
const app = express();
const actionRoutes = require('./infraestructure/rest/action-controller');
const bodyParser = require('body-parser');
const jsonContentType = require('./infraestructure/rest/middlewares/json-content-type');
const STATUS_SERVER_ERROR = 500;

app.use(bodyParser.json());
app.use(jsonContentType);
app.use(actionRoutes);

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(err.stack || err);
    }
    const message = err.message || err;
    res.status(STATUS_SERVER_ERROR).send({ error: message });
});

const server = app.listen(port, () => console.log(`Producer app listening at http://localhost:${port}`));

module.exports = { app, server };
