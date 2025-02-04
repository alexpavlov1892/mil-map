require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5001;  // Your existing port

// Enable CORS to allow frontend to access the API
app.use(cors());

// PostgreSQL connection setup
const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
});

// Test API endpoint (unchanged)
// app.get('/api', (req, res) => {
//     res.json({ "users": ["user1", "user2", "user4"] });
// });

// **New Route: Fetch Locations from Database**
app.get('/api', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, ST_X(location::geometry) AS longitude, ST_Y(location::geometry) AS latitude FROM marker`
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Server error fetching locations" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
