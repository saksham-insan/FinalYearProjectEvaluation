const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
    console.log('Testing MySQL connection...');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_PORT:', process.env.DB_PORT);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? 'SET' : 'NOT SET');
    console.log('DB_NAME:', process.env.DB_NAME);

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || ''
        });

        console.log('✅ MySQL connection successful!');
        
        // Try to create database if it doesn't exist
        await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'student_evaluation'}`);
        console.log('✅ Database created/verified!');
        
        await connection.end();
    } catch (error) {
        console.error('❌ MySQL connection failed:', error.message);
        console.log('\n🔧 Troubleshooting steps:');
        console.log('1. Make sure MySQL server is running');
        console.log('2. Check your username and password');
        console.log('3. Verify MySQL is running on port 3306');
        console.log('4. Try connecting with no password (empty string)');
    }
}

testConnection();