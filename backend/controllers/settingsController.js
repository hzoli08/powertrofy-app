const supabase = require('../database/supabaseAdmin');

exports.createSettings = async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('settings')
            .insert([{user_id: req.user.id, dark_mode: false, units: 'kg'}])
            .select()
            .single(); 
        if (error) return next(error);
        res.status(201).json(data);
    } catch (err) {
        next(err);
    }
};

exports.getSettings = async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('settings')
            .select('*')
            .eq('user_id', req.user.id)
            .single();
        if (error) return next(error);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

exports.updateSettings = async (req, res, next) => {
    try {
        const { dark_mode, units } = req.body;

        const { data, error } = await supabase
            .from('settings')
            .update({ dark_mode, units })
            .eq('user_id', req.user.id)
            .select()
            .single();
        if (error) return next(error);
        res.json(data);
    } catch (err) {
        next(err);
    }
};