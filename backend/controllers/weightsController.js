const supabase = require('../database/supabaseAdmin');

exports.logWeight = async (req, res, next) => {
    try {
        const { weight } = req.body;

        const { data, error } = await supabase
            .from('weight_logs')
            .insert([{ user_id: req.user.id, weight }])
            .select()
            .single();
        if (error) return next(error);
        res.status(201).json(data);
    } catch (err) { next(err); }
};

exports.getWeight = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        
        const { data, error } = await supabase
            .from('weight_logs')
            .select('*')
            .eq('user_id', req.user.id)
            .gte('date', from)
            .lte('date', to);
        if (error) return next(error);
        res.json(data);
    } catch (err) { next(err); }
};

exports.changeWeight = async (req, res, next) => {
    try {
        const { weight, date } = req.body;

        const { data, error } = await supabase
            .from('weight_logs')
            .update({ weight })
            .eq('user_id', req.user.id)
            .eq('date', date)
            .select()
            .single();
        if (error) return next(error);
        res.json(data);
    } catch (err) { next(err); }
};

exports.deleteWeight = async (req, res, next) => {
    try {
        const { date } = req.body;

        const { data, error } = await supabase
            .from('weight_logs')
            .delete()
            .eq('user_id', req.user.id)
            .eq('date', date)
        if (error) return next(error);
        res.json(data);
    } catch (err) { next(err); } 
};