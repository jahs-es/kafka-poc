const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const container = require('../../container');
const createAction = container.resolve('createAction');
const  { isBodyValid } = require('./middlewares/rest-validator');

router.post('/actions', [
    check('id').notEmpty(),
    check('action').notEmpty()
], isBodyValid, async (req, res, next) => {

    const { id, action } = req.body;
    const actionRequest = {
        id,
        action
    };

    try {
        await createAction.execute(actionRequest);

        return res.status(201).send();
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;
