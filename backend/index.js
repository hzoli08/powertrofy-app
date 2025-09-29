const express = require('express');
const app = express();
require('dotenv').config();
// users router const

app.use(express.json());
// user routes listener

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something\'s broke asf!' });
});

const PORT = process.env.PORT || 20339;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
