const express = require('express');
const mysql = require('mysql2/promise'); // Use mysql2 for MariaDB
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Create a connection pool for MariaDB
const db = mysql.createPool({
    host: process.env.MARIADB_HOST,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Attach the connection pool to `req` for easy access in route handlers
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Example endpoint for testing the connection
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await req.db.query('SELECT * FROM movies LIMIT 1');
        res.json({ success: true, result: rows });
    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ success: false, error: 'Database query failed' });
    }
});

// Use route handlers (e.g., authentication)
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/movie', require('./routes/movie'));
app.use('/watchlist', require('./routes/watchlist'));
app.use('/favourites', require('./routes/favourites'));
app.use('/reviews',require('./routes/review'));
app.use('/home', require('./routes/home'));
app.use('/search', require('./routes/search'));



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
