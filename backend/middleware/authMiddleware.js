const supabase = require('../database/supabaseAuth');

async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ error: 'Missing auth header' });
        }

        const token = authHeader.replace('Bearer ', '').trim();
        const { data, error } = await supabase.auth.getUser(token);
        
        if (error || !data?.user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = data.user;
        console.log('Auth result:', data, error);
        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        res.status(500).json({ error: 'Auth check failed' });
    }
}

module.exports = authMiddleware;