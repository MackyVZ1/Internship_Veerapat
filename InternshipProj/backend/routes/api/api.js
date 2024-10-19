// Import
const express = require('express');
const rounter = express.Router();
const mysql = require('mysql2');

// Create a connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'localdatabase',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 20,
});
// Connect to a database
db.connect((err) =>{
    if(err){
        console.error('Cannot connect to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL')
    const createQuery = `CREATE TABLE IF NOT EXISTS userinfo (
        firstname VARCHAR(45) NOT NULL,
        lastname VARCHAR(45) NOT NULL,
        address VARCHAR(120) NOT NULL,
        subdistrict VARCHAR(40) NOT NULL,
        area VARCHAR(40) NOT NULL,
        province VARCHAR(40) NOT NULL,
        postcode VARCHAR(6) NOT NULL,
        phonenum VARCHAR(12),
        teamchamp VARCHAR(10) NOT NULL
    )`
    db.query(createQuery, (err, results) => {
        if(err){
            res.status(400).json({msg: "Database error. Cannot query"});
            console.log(err);
        }
        console.log("Table is created.")
    })
});

// Get All user
rounter.get("/admin", (req, res) => {
    db.query("SELECT * FROM userinfo", (err, results) =>{
        // ถ้ามเชื่อมต่อไม่ได้
        if (err){
            res.status(400).json({msg : "Database errors. Cannot queries."})
        }
        // เชื่อมต่อได้
        else{
            res.json(results);
        }
    })
})

// Sign up for user
rounter.post("/userRegister", (req, res) => {
    const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        subdistrict: req.body.subdistrict,
        area: req.body.area,
        province: req.body.province,
        postcode: req.body.postcode,
        phonenum: req.body.phonenum,
        teamchamp: req.body.teamchamp
    }
    console.log(req.body)
    db.query("INSERT INTO userinfo (firstname, lastname, address, subdistrict, area, province, postcode, phonenum, teamchamp) VALUES (?,?,?,?,?,?,?,?,?)", 
        [newUser.firstname, newUser.lastname, newUser.address, newUser.subdistrict, 
            newUser.area, newUser.province, newUser.postcode, newUser.phonenum, newUser.teamchamp], (err, results) =>{
            if(err){
                console.log(err);
                res.status(400).json({msg: "Database error. Cannot insert data."})
            }
            else{
                res.json(results);
            }
        })
})
// Get All user with filter by Champion
module.exports = rounter;