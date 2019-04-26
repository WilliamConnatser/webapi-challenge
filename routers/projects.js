const express = require('express');
const db = require('../data/helpers/projectModel');

const projectsRouter = express.Router();

projectsRouter.get('/', (req, res) => {
    db.get()
        .then(dbRes => {
            res.status(200).send({
                data: dbRes
            });
        })
        .catch(err => {
            res.status(500).send({
                message: '500 - Internal Server Error'
            });
        });
});

projectsRouter.get('/:id', (req, res) => {
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

projectsRouter.post('/', (req, res) => {
    try {
        //Validation
        if (req.body.name === undefined)
            res.status(422).send({
                message: '422 - No Project Name'
            });
        if (req.body.description === undefined)
            res.status(422).send({
                message: '422 - No Project Description'
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

projectsRouter.put('/', (req, res) => {
    res.send('Projects here');
});

projectsRouter.delete('/', (req, res) => {
    res.send('Projects here');
});

module.exports = projectsRouter;