// src/server.js

const express = require('express');
import('node-fetch').then(async (nodeFetch) => {
    const fetch = nodeFetch.default;

});

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.send('Team 15 LETSGO!')
  })

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
      const apiUrl = 'https://www.guitarguitar.co.uk/hackathon/orders/';
  
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
