const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')
const { authMiddleWareIsAdmin, authMiddleWareIsUser } = require('../middleware/authMiddleware');

router.get('/', ProductController.getAllProduct)
router.get('/instock', ProductController.getAllProductInStock)
router.post('/create', authMiddleWareIsAdmin, ProductController.createProduct)
router.put('/update', authMiddleWareIsAdmin, ProductController.updateProduct)
router.delete('/delete', authMiddleWareIsAdmin, ProductController.deleteProduct)
router.get('/detail', ProductController.detailProduct)


module.exports = router