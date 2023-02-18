const router = require('express').Router();
const createError = require('http-errors');
const ProductModel = require('../models/ProductModel');

const Product = new ProductModel();

router.get('/', async (req, res, next) => {
  try {  
    const queryParams = req.query;
    
    if (!Object.keys(queryParams).length) {
      const result = await Product.find();
      res.status(200).send(result);
    } else {
      const result = await Product.findByCategory(queryParams);
      res.status(200).send(result);
    }   
  } catch(err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const result = await Product.findOne(productId);
    if (!result) {
        throw createError(404, 'Product not found');
      }
    res.status(200).send(result);
  } catch(err) {
    next(err);
  }
});

module.exports = router;