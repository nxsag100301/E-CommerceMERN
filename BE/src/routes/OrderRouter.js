const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController')
const { authMiddleWareIsAdmin, authMiddleWareIsUser, authMiddleWareIsUserParams } = require('../middleware/authMiddleware');

router.post('/create', authMiddleWareIsUser, OrderController.createOrder)
router.get('/detail/:id', OrderController.getOrder)
router.get('/detail-order/:id', OrderController.getDetailOrder)

module.exports = router