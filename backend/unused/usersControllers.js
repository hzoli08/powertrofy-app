const supabase = require('../database/supabaseAdmin');

exports.createUser = async (req, res, next) => {
    try {
        const { username, email } = req.body;
        const result = await supabase.query(
            'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
            [username, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const result = await supabase.query(
            'SELECT * FROM users WHERE id = $1',
            [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const { username, email } = req.body;
        const result = await supabase.query(
            'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *',
            [username, email, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}