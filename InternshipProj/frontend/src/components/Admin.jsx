import {useEffect, useState} from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./Admin.css"

const Admin = () => {
    // สำหรับเก็บข้อมูล .json
    const [data, setData] = useState([])

    const [teamchamp, setTeamchamp] = useState('')
    const teamchampList = ["เรือ", "ช้าง", "ม้า", "โคน"]
    const nav = useNavigate() // ใช้ย้ายไปหน้าเว็บอื่น
    const [loading, setLoading] = useState(true); // สำหรับตรวจสอบสถานะการโหลด
    const [error, setError] = useState(null); // สำหรับเก็บข้อผิดพลาด

    // ดึงข้อมูลจากฐานข้อมูล
    useEffect(() =>{
        const showUser = async() =>{
            try{
                // ยิง API GET method
                const response = await axios.get("http://localhost:5000/api/admin")
                if(response.status === 200){
                    console.log(response.data)
                    // นำ json มาเก็บใน data
                    setData(response.data)
                }
            }catch(error){
                console.log("Error: ", error)
            }finally{
                setLoading(false)
            }
        }
        showUser()
    },[]) // [] สำหรับเรนเดอร์ข้อมูลครั้งเดียว ป้องกันการลูป
    
    // การเลือกทีมที่ select
    const handleChange = (e) => {
        setTeamchamp(e.target.value);
    };

    // กรองข้อมูลเพื่อแสดงเฉพาะทีมที่ทายตามที่เลือก
    const filteredData = teamchamp
        ? data.filter((item) => item.teamchamp === teamchamp)
        : data;

    if (loading) return <div>Loading...</div>; // แสดงข้อความขณะรอข้อมูล
    if (error) return <div>Error: {error}</div>; // แสดงข้อผิดพลาดถ้ามี
    

    return(
        <div>
            <div className='logoutDiv'>
                <button className='logoutButton' onClick={() => {nav("/")}}> Log Out</button>
            </div>
            <div className='title'>
                <h2 className='titleText'> ⚽⚽รายชื่อผู้เข้าร่วมการชิงโชคทายผลฟุตบอล⚽⚽</h2>
                <h3 className='titleText'> รอบสี่ทีมสุดท้าย</h3>
            </div>
            <form>
                <label> กรองการแสดงข้อมูล </label>
                <select
                    value={teamchamp}
                    onChange={handleChange}
                    required
                >
                    <option value="">ทั้งหมด</option>
                    {teamchampList.map((team, index) => (
                        <option key={index} value={team}>{team}</option>
                    ))}
                </select>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ชื่อ</th>
                        <th>นามสกุล</th>
                        <th>เบอร์ติดต่อ</th>
                        <th>ทีมที่ทาย</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((column) =>(
                        <tr>
                            <td>{column.firstname}</td>
                            <td>{column.lastname}</td>
                            <td>{column.phonenum}</td>
                            <td>{column.teamchamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Admin;