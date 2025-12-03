// database.js - Updated version
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'securevoice',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
pool.getConnection()
    .then(connection => {
        console.log('Connected to database as id ' + connection.threadId);
        connection.release();
    })
    .catch(err => {
        console.error('Database connection failed: ' + err.stack);
    });

module.exports = pool;