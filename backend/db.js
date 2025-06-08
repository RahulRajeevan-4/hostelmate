// db.js

import pg from 'pg';
import 'dotenv/config'; // Modern way to load dotenv

// Create a new PostgreSQL connection pool
const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Optional: Log successful connection (errors are handled by default, or you can add specific error handling if needed)
pool.on('connect', () => {
    console.log(`Connected to PostgreSQL database: ${process.env.DB_DATABASE}`);
});

export default pool; // Export the pool directly for easier use