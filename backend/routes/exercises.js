const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const supabase = require('../database/supabaseAdmin');

router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('exercises')
            .select('*')
        if (error) return next(error);
        res.json(data);
    } catch (err) { next(err) }
});

module.exports = router;