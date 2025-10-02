const express = require('express');
const controller = require('../controllers/weightsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, controller.getWeight);
router.post('/', authMiddleware, controller.logWeight);
router.patch('/', authMiddleware, controller.changeWeight);
router.delete('/', authMiddleware, controller.deleteWeight);

module.exports = router;