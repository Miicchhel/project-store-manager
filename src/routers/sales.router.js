const express = require('express');
const { salesControler } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  salesControler.listSales,
);

router.get(
  '/:id',
  salesControler.listSaleById,
);

// router.post(
//   '/',
//   salesControler.addSale(),
// );

module.exports = router;