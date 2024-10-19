// import extension
const express = require('express');
const cors = require('cors')

// Define Port
const port = process.env.port || 5000;

// Init express
const app = express();

// เพิ่ม cors ในการเข้าถึงข้อมูล
app.use(cors({
    origin: "*"
}))

// ตั้งให้รับข้อมูลแบบ .json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// กำหนด route ที่จะใช้
app.use('/api', require('./routes/api/api.js'))

// Listen on a port
app.listen(port, () => console.log(`Server is running on ${port}`));