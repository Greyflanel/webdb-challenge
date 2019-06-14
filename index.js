const express = require('express');
const helmet = require('helmet');
const db = require('./data/dbConfig');
const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/projects', (req, res) => {
    db()
    .then(allProjects => {
        res.json(allProjects)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json( { message: 'error retrieving projects'})
    })
})

server.post('/api/projects', (req, res) => {
    db(req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'error adding new project'})
    })
})

    const port = 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
)