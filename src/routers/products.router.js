const express = require('express');
const { productsController } = require('../controllers');
const validateNewProduct = require('../middlewares/validateNewProduct');

const router = express.Router();

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.listProductById,
);

router.post(
  '/',
  validateNewProduct,
  productsController.addProduct,
);

module.exports = router;