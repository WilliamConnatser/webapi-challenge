const express = require('express');
var cors = require('cors')
const server = express();
const actionsRouter = require('./routers/actions');
const projectsRouter = require('./routers/projects');

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('hello world')
})

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

module.exports = server;