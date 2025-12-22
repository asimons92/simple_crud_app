const express = require('express');
const router = express.Router();
const Product = require('../models/product.model.js');
const {getProducts, getProductById, updateProduct, deleteProduct, addProduct} = require('../controllers/product.controller.js');


// add new product
router.post('/', addProduct);

// get all products
router.get('/', (req, res, next) => {
  console.log('GET /products route hit');
  next();
}, getProducts);

// get product by id
router.get('/:id', (req, res, next) => {
  console.log('GET /:id route hit, id param:', req.params.id);
  next();
}, getProductById);

// update product
router.put('/:id', updateProduct);

// delete product
router.delete('/:id', deleteProduct);

    

module.exports = router;

