const express = require('express');
const { createOrder, getAllOrdersForTable } = require('./order.controller');

const router = express.Router();

router.post('/:tableId', createOrder);
router.get('/:tableId', getAllOrdersForTable);

module.exports = router;
