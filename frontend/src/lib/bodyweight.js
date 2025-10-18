import { supabase } from './supabase';

export const logWeight = async (user_id, weight) => {
    const { error } = await supabase
        .from('weight_logs')
        .insert([user_id, weight ])
        .select()
        .single();
    if (error) throw error;
};

export const getWeights = async (user_id, time) => {
    const { data, error } = await supabase
        .from('weight_logs')
        .select('*')
        .eq('user_id', user_id)
        .gte('date', since.toISOString().slice(0, 10))
        .order('date', { ascending: true });
    if (error) throw error;
    return data;
};