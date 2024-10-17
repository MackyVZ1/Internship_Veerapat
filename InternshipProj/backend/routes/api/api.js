// Import
const express = require('express');
const rounter = express.Router();
const mysql = require('mysql2');

// Create a connection
const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12718944',
    password: '1DYCQpAPGS',
    database: 'sql12718944'
});

// Connect to a database
db.connect((err) =>{
    if(err){
        console.error('Cannot connect to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL')
});

module.exports = rounter;