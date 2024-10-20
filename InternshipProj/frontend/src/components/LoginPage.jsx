import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import "./LoginPage.css"
import "./Admin.jsx"
import axios from 'axios'


const LoginPage = () => {
    // ค่าต่างๆที่จะใช้
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [address, setAddress] = useState('')
    const [subdistrict, setSubdistrict] = useState('')
    const [area, setArea] = useState('')
    const [province, setProvince] = useState('')
    const [postcode, setPostcode] = useState('')
    const [phonenum, setPhonenum] = useState('')
    const [teamchamp, setTeamchamp] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showAdminPopup, setShowAdminPopup] = useState(false);
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const nav = useNavigate()
    // รายชื่อทีมที่ต้องเลือก
    const teamchampList = ["เรือ", "ช้าง", "ม้า", "โคน"]

    // กดยืนยันการลงทะเบียน
    const handleSubmit = (e) => {
        e.preventDefault();
        // ตรวจสอบว่าทุกฟิลด์ไม่เป็นค่าว่าง
        if (!firstname || !lastname || !address || !subdistrict || !area || !province || !postcode || !teamchamp) {
            setError('!!!กรุณากรอกข้อมูลให้ครบทุกช่อง!!!');
            return;
        }
        // ถ้าทุกอย่างถูกต้อง
        setError('');
        console.log('Register Success with', {firstname, lastname, address, subdistrict, area, province, postcode, phonenum, teamchamp});
        
        // ส่งข้อมูลไปในฐานข้อมูล
        registerUser({
            firstname,
            lastname,
            address,
            subdistrict,
            area,
            province,
            postcode,
            phonenum,
            teamchamp
        });
        
    }

    // ลงทะเบียนผู้ใช้ รับ input คือ userData
    const registerUser = async (userData) => {
        try {
            // ยิง API POST method
            const response = await axios.post("http://localhost:5000/api/userRegister", userData);
            // ส่งผ่าน
            if (response.status === 200) {
                console.log('Register Success:', response.data);
                setSuccess('ลงทะเบียนสำเร็จ!');
                // รีเซตค่าที่หน้าเว็บเมื่อส่งข้อมูลไปฐานข้อมูล
                setFirstname('');
                setLastname('');
                setAddress('');
                setSubdistrict('');
                setArea('');
                setProvince('');
                setPostcode('');
                setPhonenum('');
                setTeamchamp('');
            } else {
                setError('มีปัญหาในการลงทะเบียน');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('การเชื่อมต่อขัดข้อง กรุณาลองใหม่อีกครั้ง');
        }
    };

    // กดเข้าหน้า login ของ admin
    const handleAdminButtonClick = () => {
        setShowAdminPopup(true);
    };

    // กด login ของ admin
    const handleAdminLogin = () => {
        // เช็คเงื่อนไข username / password
        if (adminUsername === "admin" && adminPassword === "1234")
            console.log('Admin Login:', { adminUsername, adminPassword });
            setShowAdminPopup(false); // ปิดป็อปอัพ
            nav("/Admin")
    };


    return(
        <div>
            <div className='title'>
                <button className='adminButton' onClick={handleAdminButtonClick}> สำหรับ Admin</button>
            </div>
            <h2 className='titleText'> ⚽⚽ ชิงโชคลุ้นของรางวัล ⚽⚽</h2>
            <h3 className='titleText'> กรอกข้อมูลส่วนตัวและเลือกทีมที่คิดว่าจะได้แชมป์</h3>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form className='loginform' onSubmit={handleSubmit}>
                <div className='firstname'>
                    <input 
                        placeholder='ชื่อ'
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </div>
                <div className='lastname'>
                    <input 
                        placeholder='นามสกุล'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>
                <div className='address'>
                    <input 
                        placeholder='ที่อยู่'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className='subdistrict'>
                    <input 
                        placeholder='ตำบล/แขวง'
                        value={subdistrict}
                        onChange={(e) => setSubdistrict(e.target.value)}
                        required
                    />
                </div>
                <div className='area'>
                    <input 
                        placeholder='อำเภอ/เขต'
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        required
                    />
                </div>
                <div className='province'>
                    <input 
                        placeholder='จังหวัด'
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        required
                    />
                </div>
                <div className='postcode'>
                    <input 
                        placeholder='รหัสไปรษณีย์'
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        required
                    />
                </div>
                <div className='phonenum'>
                    <input 
                        placeholder='เบอร์ติดต่อ'
                        value={phonenum}
                        onChange={(e) => setPhonenum(e.target.value)}
                    />
                </div>
                <div className='teamchamp'>
                    <select 
                        value={teamchamp}
                        onChange={(e) => setTeamchamp(e.target.value)}
                        required
                    >
                        <option value="">เลือกทีมที่จะได้แชมป์</option>
                        {teamchampList.map((team, index) => (
                            <option key={index} value={team}>{team}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">ยินยัน</button>
            </form>

            {showAdminPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h3>Admin Login</h3>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={adminUsername}
                            onChange={(e) => setAdminUsername(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                        />
                        <button onClick={handleAdminLogin}>
                            Login
                        </button>
                        <button onClick={() => setShowAdminPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LoginPage;