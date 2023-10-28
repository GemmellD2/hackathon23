// src/server.js

const express = require('express');
const NodeCache = require('node-cache');
import('node-fetch').then(async (nodeFetch) => {
    const fetch = nodeFetch.default;

});

const cache = new NodeCache();
const app = express();
const port = 8000;

let ordersData;

app.get('/', (req, res) => {
    res.send('Team 15 LETSGO!')
  })

// should maybe cache
app.get('/customers', async (req, res) => {
  try {
    const apiUrl = 'https://www.guitarguitar.co.uk/hackathon/customers/';

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/orders', async (req, res) => {
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

  // should maybe cache?
  app.get('/products', async (req, res) => {
    try {
      const apiUrl = 'https://www.guitarguitar.co.uk/hackathon/products/';
  
      const response = await fetch(apiUrl); 
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });   

  app.get('/getOrders/:id', async (req, res) => {
    try {
        const cachedOrders = cache.get('allOrders');
        customerId = parseInt(req.params.id);
  
        if (cachedOrders) {
            const filteredOrders = cachedOrders.filter(order => order.CustomerId === customerId)
            return res.json(filteredOrders);
        }

        const apiUrl = 'https://www.guitarguitar.co.uk/hackathon/orders/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const orders = await response.json();
        cache.set('allOrders', orders, 600);
        const filteredOrders = orders.filter(order => order.CustomerId === customerId)
        res.json(filteredOrders);
  
  
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
