require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/api", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, organiser, funding, status, info, start_date, end_date, target_audience, country, ST_X(location::geometry) AS longitude, ST_Y(location::geometry) AS latitude FROM marker`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ error: "Server error fetching locations" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
