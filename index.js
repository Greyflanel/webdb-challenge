const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/dishes', async (req, res) => {
    try {
      const dishes = await db('dishes');
      res.status(200).json(dishes);
    } catch (error) {
      res.status(500).json(error);
    }
})

    const port = 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
)