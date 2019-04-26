const express = require('express');
const db = require('../data/helpers/actionModel');

const actionsRouter = express.Router();

//Function validates input on PUT and POST endpoints
const validateBody = (req, res) => {

    //Validation
    const actionValidation = {
        project_id: {
            type: 'number'
        },
        description: {
            type: 'string',
            limit: 128
        },
        notes: {
            type: 'string'
        },
        completed: {
            type: 'boolean'
        }
    };

    //Get fields submitted in request body
    const fieldsSubmitted = Object.keys(req.body);

    //For each field submitted
    for (const field of fieldsSubmitted) {
        let found = false;

        //See if it's in the validations object
        for (const key in actionValidation) {

            //If the field submitted is a valid field
            if (key === field) {

                found = true;

                //Check the data type
                if (typeof req.body[field] !== actionValidation[key].type)
                    res.status(422).send({
                        message: `422 - Invalid Data Type Submitted: ${key} is ${typeof req.body[field]}`
                    });

                //If there's a max length, check it
                if (actionValidation[key].limit !== undefined && req.body[field].length > actionValidation[key].limit)
                    res.status(422).send({
                        message: `422 - Invalid Submission: ${key} is too long. Max length is ${actionValidation[key].limit}`
                    });
            }
        }

        //If it's not a valid field respond with 422 error
        if (!found) res.status(422).send({
            message: `422 - Invalid Field Submitted: ${field}`
        });
    }
}

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

        validateBody(req, res);

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

actionsRouter.put('/:id', (req, res) => {
    try {
        validateBody(req, res);

        db.update(req.params.id, req.body)
            .then(dbRes => {
                if (dbRes)
                    res.status(200).send({
                        data: dbRes
                    });
                else
                    res.status(422).send({
                        message: '422 - Invalid Action ID'
                    });
            })
    } catch (err) {
        res.status(500).send({
            message: '500 - Internal Server Error'
        });
    }
});

actionsRouter.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(dbRes => {
            if (dbRes > 0)
                res.status(200).send({
                    message: `${req.params.id} Was Deleted`
                });
            else
                res.status(422).send({
                    message: '422 - Invalid Project ID'
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: '500 - Internal Server Error'
            });
        });
});

module.exports = actionsRouter;