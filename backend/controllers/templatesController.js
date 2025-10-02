const supabase = require('../database/supabaseAdmin');

exports.createTemplate = async (req, res, next) => {
    try {
        const { name, day, exercises } = req.body;

        const { data: template, error: templateError } = await supabase
            .from('templates')
            .insert([{ user_id: req.user.id, name, day }])
            .select()
            .single();
        if (templateError) return next(templateError);
        
        const exercisesWithId = exercises.map(ex => ({
            ...ex,
            template_id: template.id,
        }));

        const { data: insertedExercises, error: exerciseError } = await supabase
            .from('template_exercises')
            .insert(exercisesWithId)
            .select();
        if (exerciseError) {
            await supabase.from('templates').delete().eq('id', template.id);
            return next (exerciseError);
        }

        res.status(201).json({ template, exercises: insertedExercises });
    } catch (err) { next(err); }
};

exports.getTemplates = async (req, res, next) => {
    try {
        const { data: templates, error: templateError } = await supabase
            .from('templates')
            .select('*')
            .eq('user_id', req.user.id);
        if (templateError) return next(templateError);
        if (templates.length === 0) return res.json([]);

        const { data: exercises, error: exerciseError } = await supabase
            .from('template_exercises')
            .select('*')
            .in('template_id', templates.map(t => t.id));
        if (exerciseError) return next(exerciseError);

        const withExercises = templates.map(t => ({
            ...t,
            exercises: exercises.filter(ex => ex.template_id === t.id)
        }));

        res.json(withExercises);
    } catch (err) { next(err); }
}

exports.changeTemplate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, day, exercises } = req.body;

        const { data: template, error: templateError } = await supabase
            .from('templates')
            .update({ name, day })
            .eq('user_id', req.user.id)
            .eq('id', id)
            .select()
            .single();
        if (templateError) return next(templateError);

        await supabase.from('template_exercises').delete().eq('template_id', id);

        const exercisesWithId = exercises.map(ex => ({
            ...ex,
            template_id: id,
        }));

        const { data: changedExercises, error: exerciseError } = await supabase
            .from('template_exercises')
            .insert(exercisesWithId)
            .select();
        if (exerciseError) return next(exerciseError);

        res.json({ template, changedExercises });
    } catch (err) { next(err); }
}

exports.deleteTemplate = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('templates')
            .delete()
            .eq('user_id', req.user.id)
            .eq('id', id)
        if (error) return next(error);
        res.json(data);
    } catch (err) { next(err); }
}