const express = require('express');
const controller = require('../controllers/sessionsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, controller.saveSession);
router.get('/:template_id', authMiddleware, controller.getSessions);
router.delete('/:id', authMiddleware, controller.deleteSession);

module.exports = router;