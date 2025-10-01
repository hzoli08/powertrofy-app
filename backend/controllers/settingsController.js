const supabase = require('@supabase/supabase-js');

exports.createSettings = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const initial = { darkMode: false, units: 'kg' };
        
        const result = await supabase.query(
            'INSERT INTO settings (user_id, dark_mode, units) VALUES ($1, $2, $3) RETURNING *',
            [userId, initial.darkMode, initial.units]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}

exports.getSettings = async (req, res, next) => {
    try {
        const userId = req.params.id;
        
        const result = await supabase.query(
            'SELECT * FROM settings WHERE user_id = $1',
            [userId]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'User settings not found' });
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}

exports.updateSettings = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { darkMode, units } = req.body;

        const result = await supabase.query(
            'UPDATE settings SET dark_mode = $2, units = $3 WHERE user_id = $1',
            [userId, darkMode, units]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'User settings not found'});
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}