const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');

router.post('/', usersController.createUser);
router.get('/:id', usersController.getUser);
router.patch('/:id', usersController.updateUser);

module.exports = router;