const express = require('express');

const projectsRouter = express.Router();

projectsRouter.get('/',(req, res) => {
    res.send('Projects here');
});

projectsRouter.post('/',(req, res) => {
    res.send('Projects here');
});

projectsRouter.put('/',(req, res) => {
    res.send('Projects here');
});

projectsRouter.delete('/',(req, res) => {
    res.send('Projects here');
});

module.exports = projectsRouter;