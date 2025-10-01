const supabase = require('../database/supabaseAuth');

(async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'h.zoli.xperimental@gmail.com',
        password: 'password123'
    });

    if (error) {
        console.error(error);
    } else {
        console.log('Access Token: ', data.session.access_token);
    }
})();