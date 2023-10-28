const cache = require('../cache');
const express = require('express');
const router = express.Router();

  // should maybe cache?
  router.get('/products', async (req, res) => {
    try {
        const cachedProducts = cache.get('allProducts');
  
        if (cachedProducts) {
          return res.json(cachedProducts);
        }
  
        const apiUrl = 'https://www.guitarguitar.co.uk/hackathon/products/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const products = await response.json();
        cache.set('allProducts', products, 600);   
        res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });   

  router.get('/products/getProduct/:id', async (req, res) => {
    try {
        const cachedProducts = cache.get('allProducts');
        prodId = req.params.id;
  
        if (cachedProducts) {
            const filteredProducts = cachedProducts.filter(prod => prod.SKU_ID === prodId)
            return res.json(filteredProducts);
        }

        const apiUrl = 'https://www.guitarguitar.co.uk/hackathon/products/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const products = await response.json();
        cache.set('allProducts', products, 600);
        const filteredProducts = products.filter(prod => prod.SKU_ID === prodId)
        res.json(filteredProducts);
    } catch (error) {
        res.status(500).json({ error : error.message });
    } 
  });

module.exports = router;