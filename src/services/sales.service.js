const { salesModel } = require('../models');

const listSales = async () => {
  const sales = await salesModel.listSales();
  console.log(sales);
  return { type: null, message: sales };
};

const listSaleById = async (saleId) => {
  const sale = await salesModel.listSaleById(saleId);
  if (!sale || sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

const addSale = () => { };

module.exports = {
  listSales,
  listSaleById,
  addSale,
};