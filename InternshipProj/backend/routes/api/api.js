// Import
const express = require('express');
const rounter = express.Router();
const mysql = require('mysql2');

// Create a connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'localdatabase',
    port: 3306
});
// Connect to a database
db.connect((err) =>{
    if(err){
        console.error('Cannot connect to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL')
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
rounter.post("/register", (req, res) => {
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