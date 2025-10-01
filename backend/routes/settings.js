const express = require('express');
const controller = require('../controllers/settingsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, controller.getSettings);
router.post('/', authMiddleware, controller.createSettings);
router.patch('/', authMiddleware, controller.updateSettings);

module.exports = router;