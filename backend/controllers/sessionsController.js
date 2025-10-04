const supabase = require('../database/supabaseAdmin');

exports.saveSession = async (req, res, next) => {
    try {
        const { template_id, duration, sets } = req.body;

        const { data: session, error: sessionError } = await supabase
            .from('sessions')
            .insert([{ template_id, duration }])
            .select()
            .single();
        if (sessionError) return next(sessionError);

        const setsWithId = sets.map(set => ({
            ...set,
            session_id: session.id
        }));

        const { data: insertedSets, error: setsError } = await supabase
            .from('set_logs')
            .insert(setsWithId)
            .select();
        if (setsError) {
            await supabase.from('sessions').delete().eq('id', session.id);
            return next(setsError);
        }

        res.status(201).json({ session, insertedSets });
    } catch (err) { next(err); }
};

exports.getSessions = async (req, res, next) => {
    try {
        const { template } = req.body;

        const { data: sessions, error: sessionsError } = await supabase
            .from('sessions')
            .select('*')
            .eq('template_id', template)
        if (sessionsError) return next(sessionsError);

        const { data: sets, error: setsError } = await supabase
            .from('set_logs')
            .select('*')
            .in('session_id', sessions.map(s => s.id));
        if (setsError) return next(setsError);

        const withSets = sessions.map(s => ({
            ...s,
            sets: sets.filter(set => set.session_id === s.id)
        }));

        res.json(withSets);
    } catch (err) { next(err); }
};

exports.deleteSession = async (req, res, next) => {
    try {
        const { id } = req.params
        
        const { data, error } = await supabase
            .from('sessions')
            .delete()
            .eq('id', id)
        if (error) return next(error);

        res.json(data);
    } catch (err) { next(err); }
}