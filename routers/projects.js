const express = require('express');
const db = require('../data/helpers/projectModel');

const projectsRouter = express.Router();

//Function validates input on PUT and POST endpoints
const validateBody = (req, res) => {

    //Validation
    const projectValidation = {
        name: {
            type: 'string'
        },
        description: {
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
        for (const key in projectValidation) {

            //If the field submitted is a valid field
            if (key === field) {

                found = true;

                //Check the data type
                if (typeof req.body[field] !== projectValidation[key].type)
                    res.status(422).send({
                        message: `422 - Invalid Data Type Submitted: ${key} is ${typeof req.body[field]}`
                    });
            }
        }

        //If it's not a valid field respond with 422 error
        if (!found) res.status(422).send({
            message: `422 - Invalid Field Submitted: ${field}`
        });
    }
}

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

projectsRouter.get('/:id/actions', (req, res) => {
    db.getProjectActions(req.params.id)
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
        //Validation Required Fields
        if (req.body.name === undefined)
            res.status(422).send({
                message: '422 - No Project Name'
            });
        if (req.body.description === undefined)
            res.status(422).send({
                message: '422 - No Project Description'
            });

        //Validate Fields In General
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

projectsRouter.put('/:id', (req, res) => {

    try {
        //Validate fields
        validateBody(req, res);

        db.update(req.params.id, req.body)
            .then(dbRes => {
                if (dbRes)
                    res.status(200).send({
                        data: dbRes
                    });
                else
                    res.status(422).send({
                        message: '422 - Invalid Project ID'
                    });
            })
    } catch (err) {
        res.status(500).send({
            message: '500 - Internal Server Error'
        });
    }
});

projectsRouter.delete('/:id', (req, res) => {

    let deletedProject;

    db.get(req.params.id)
        .then(dbRes => {
            if (dbRes) {
                deletedProject = dbRes;
                return;
            } else
                res.status(422).send({
                    message: '422 - Invalid ID'
                });
        })
        .then(_ => {
            return db.remove(req.params.id);
        })
        .then(dbRes => {
            if (dbRes > 0)
                res.status(200).send({
                    data: deletedProject
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

module.exports = projectsRouter;