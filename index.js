const express = require('express');
const helmet = require('helmet');
const db = require('./data/dbConfig');
const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/projects', async (req, res) => {
        try {
          const projects = await db('projects'); 
          res.status(200).json(projects);
        } catch (error) {
            console.log(error);
          res.status(500).json(error);
        }
      });
 server.get('/api/actions', async (req, res) => {
        try {
          const actions = await db('actions'); 
          res.status(200).json(actions);
        } catch (error) {
            console.log(error);
          res.status(500).json(error);
        }
      });

      

server.post('/api/projects', async (req, res) => {
    try {
      const projects = await db('projects').insert(req.body)

      res.status(201).json(projects);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error adding project", error });
    }
  });

  server.post('/api/actions', async (req, res) => {
    try {
      const actions = await db('actions').insert(req.body)

      res.status(201).json(actions);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error adding action", error });
    }
  });
 
  server.get('/api/actions/:id', async (req, res) => {
    try {
      const actions = await db('actions')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(actions);
    } catch (error) {
        console.log(error);
        
      res.status(500).json(error);
    }
  });
 
  server.get('/api/projects/:id', async (req, res) => {
        try {
          const project = await db('projects')
            .where({ id: req.params.id })
            .first();
          res.status(200).json(project);
        } catch (error) {
            console.log(error);
            
          res.status(500).json(error);
        }
      });
      const errors = {
        '19': 'Another record with that value exists',
      };
  
      server.get('/api/projects/:id/actions', async (req, res) => {
        try {
          const actions = await db('actions')
            .where({ id: req.params.id })
            .first();
          res.status(200).json(actions);
        } catch (error) {
          res.status(500).json(error);
        }
      });


      
      server.put('/api/projects/:id', async (req, res) => {
        try {
          const count = await db('projects')
            .where({ id: req.params.id })
            .update(req.body);
      
          if (count > 0) {
            const projects = await db('projects')
              .where({ id: req.params.id })
              .first();
      
            res.status(200).json(projects);
          } else {
            res.status(404).json({ message: 'Project not found' });
          }
        } catch (error) {}
      });
      
      server.put('/api/actions/:id', async (req, res) => {
        try {
          const count = await db('actions')
            .where({ id: req.params.id })
            .update(req.body);
      
          if (count > 0) {
            const actions = await db('actions')
              .where({ id: req.params.id })
              .first();
      
            res.status(200).json(actions);
          } else {
            res.status(404).json({ message: 'Action not found' });
          }
        } catch (error) {}
      });

      server.delete('/api/projects/:id', async (req, res) => {
        try {
          const count = await db('projects')
            .where({ id: req.params.id })
            .del();
      
          if (count > 0) {
            res.status(204).end();
          } else {
            res.status(404).json({ message: 'Project not found' });
          }
        } catch (error) {}
      });

      server.delete('/api/actions/:id', async (req, res) => {
        try {
          const count = await db('actions')
            .where({ id: req.params.id })
            .del();
      
          if (count > 0) {
            res.status(204).end();
          } else {
            res.status(404).json({ message: 'Action not found' });
          }
        } catch (error) {
            console.log(error);
            
        }
      });


  const port = 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
)