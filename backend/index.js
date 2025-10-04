const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use('/users', require('./routes/users'));
app.use('/settings', require('./routes/settings'));
app.use('/weights', require('./routes/weights'));
app.use('/templates', require('./routes/templates'));
app.use('/sessions', require('./routes/sessions'));

app.use((err, req, res, next) => {
    console.error('Error caught:', err);
    res.status(500).json({ error: err.message || err });
});

const PORT = process.env.PORT || 20339;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
