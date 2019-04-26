const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('hello world')
})

// server.use('/api/actions', actionsRouter);
// server.use('/api/projects', projectsRouter);

module.exports = server;