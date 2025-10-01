const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

if (!url || !serviceKey) {
    console.error('Error: Supabase URL or Service Key not found!');
    process.exit(1);
}

const supabaseAdmin = createClient(url, serviceKey);
module.exports = supabaseAdmin;