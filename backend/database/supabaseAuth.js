const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;

if (!url || !anonKey) {
    console.error('Error: Supabase URL or Anon Key not found!');
    process.exit(1);
}

const supabaseAnon = createClient(url, anonKey);
module.exports = supabaseAnon;