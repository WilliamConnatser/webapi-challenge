const express = require('express');

const actionsRouter = express.Router();

actionsRouter.get('/',(req, res) => {
    res.send('Actions here');
});

actionsRouter.post('/',(req, res) => {
    res.send('Actions here');
});

actionsRouter.put('/',(req, res) => {
    res.send('Actions here');
});

actionsRouter.delete('/',(req, res) => {
    res.send('Actions here');
});

module.exports = actionsRouter;