const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { message } = await productsService.listProducts();

  res.status(200).json(message);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  
  const { type, message } = await productsService.listProductById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const addProduct = async (req, res) => {
  console.log('#######################################################:', req.body);
  const { name } = req.body;

  const { type, message } = await productsService.addProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(201).json(message);
};

module.exports = {
  listProducts,
  listProductById,
  addProduct,
};