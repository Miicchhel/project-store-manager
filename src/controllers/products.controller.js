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

module.exports = {
  listProducts,
  listProductById,
};