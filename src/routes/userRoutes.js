const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController')

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/:id', userController.updateUser);
router.get('/:id', userController.deleteUser);

module.exports = router;
