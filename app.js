const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware untuk file statis
app.use(express.static(path.join(__dirname, 'public')));

// Rute
app.use('/api/items', itemRoutes);

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});