const express = require('express');
const db = require('../data/helpers/actionModel');

const actionsRouter = express.Router();

actionsRouter.get('/', (req, res) => {
    db.get()
        .then(dbRes => {
            res.send({
                data: dbRes
            });
        })
        .catch(err => {
            res.status(500).send({
                message: '500 - Internal Server Error'
            });
        });
});

actionsRouter.get('/:id', (req, res) => {
    db.get(req.params.id)
        .then(dbRes => {
            if (dbRes)
                res.status(200).send({
                    data: dbRes
                });
            else
                res.status(422).send({
                    message: '422 - Invalid ID'
                });
        })
        .catch(err => {
            res.status(500).send({
                message: '500 - Internal Server Error'
            });
        });
});

actionsRouter.post('/', (req, res) => {
    try {
        //Validation
        if (req.body.project_id === undefined)
            res.status(422).send({
                message: '422 - No Project ID'
            });
        if (req.body.description === undefined)
            res.status(422).send({
                message: '422 - No Action Description'
            });
        if (req.body.description > 128)
            res.status(422).send({
                message: '422 - Action Description Too Long - 128 Char Limit'
            });
        if (req.body.notes === undefined)
            res.status(422).send({
                message: '422 - No Action Notes'
            });

        db.insert(req.body)
            .then(dbRes => {
                res.status(200).send({
                    data: dbRes
                });
            });
    } catch (err) {
        res.status(500).send({
            message: '500 - Internal Server Error'
        });
    }
});

actionsRouter.put('/', (req, res) => {
    res.send('Actions here');
});

actionsRouter.delete('/', (req, res) => {
    res.send('Actions here');
});

module.exports = actionsRouter;