const { productsModel } = require('../models');
const schema = require('./Validations/validationsInputValues');

const listProducts = async () => {
  const products = await productsModel.listProducts();
  return { type: null, message: products };
};

const listProductById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.listProductById(productId);

  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const addProduct = async (productName) => {
  const newProductId = await productsModel.addProduct({ name: productName });
  const newProduct = await productsModel.listProductById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  listProducts,
  listProductById,
  addProduct,
};