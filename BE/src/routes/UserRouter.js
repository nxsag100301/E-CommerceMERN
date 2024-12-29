const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authMiddleWareIsAdmin, authMiddleWareIsUser } = require('../middleware/authMiddleware');

router.get('/', authMiddleWareIsAdmin, UserController.getUser)
router.post('/register', UserController.createUser)
router.post('/login', UserController.userLogin)
router.put('/update', UserController.updateUser)
router.delete('/delete', authMiddleWareIsAdmin, UserController.deleteUser)
router.get('/detail/:id', UserController.getDetailUser)
router.post('/refresh-token', UserController.refreshToken)

module.exports = router