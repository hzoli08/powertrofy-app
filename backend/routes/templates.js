const express = require('express');
const controller = require('../controllers/templatesController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, controller.createTemplate);
router.get('/', authMiddleware, controller.getTemplates);
router.patch('/:id', authMiddleware, controller.changeTemplate);
router.delete('/:id', authMiddleware, controller.deleteTemplate);

module.exports = router;