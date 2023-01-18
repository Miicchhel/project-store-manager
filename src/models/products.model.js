// const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const listProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const listProductById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [productId],
  );
  return product;
};

const addProduct = async (productName) => {
  const columns = Object.keys(productName).join(', ');
  const placeholders = Object.keys(productName).map((_key) => '?').join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(productName)],
  );

  return insertId;
};

module.exports = {
  listProducts,
  listProductById,
  addProduct,
};