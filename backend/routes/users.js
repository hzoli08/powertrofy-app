const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/me', authMiddleware, (req, res) => {
    res.json({
        id: req.user.id,
        email: req.user.email
    });
});

router.patch('/me', authMiddleware, async (req, res) => {
    const { data, error } = await req.supabase.auth.admin.updateUserById(
        req.user.id,
        { email: req.body.email }
    );

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

module.exports = router;