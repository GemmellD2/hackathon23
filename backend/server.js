// src/server.js

const express = require('express');
const cache = require('./cache');
var cors = require('cors')
import('node-fetch').then(async (nodeFetch) => {
    const fetch = nodeFetch.default;
});
const app = express();
const port = 8000;

app.use(cors());

const productRoutes = require('./api/productRoutes');
app.use('/api', productRoutes);

const customerRoutes = require('./api/customerRoutes');
app.use('/api', customerRoutes);

app.get('/', (req, res) => {
    res.send('Team 15 LETSGO!')
  })

app.get('/api/orders', async (req, res) => {
    try {
      const cachedOrders = cache.get('allOrders');

      if (cachedOrders) {
        return res.json(cachedOrders);
      }

      const apiUrl = 'https://www.guitarguitar.co.uk/hackathon/orders/';
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const orders = await response.json();
      cache.set('allOrders', orders, 600);   
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = {
    cache,
}