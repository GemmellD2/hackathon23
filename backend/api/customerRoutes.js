const cache = require('../cache');
const express = require('express');
const router = express.Router();

// should maybe cache
 router.get('/customers', async (req, res) => {
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

  router.get('/customers/:id', async (req, res) => {
    try {
      const apiUrl = 'https://www.guitarguitar.co.uk/hackathon/customers/';
      const response = await fetch(apiUrl);
      customerId = parseInt(req.params.id);
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
  
      res.json(data.filter(customer => customer.Id === customerId));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  router.get('/customers/getOrders/:id', async (req, res) => {
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

module.exports = router;