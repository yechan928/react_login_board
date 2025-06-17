// login-board/server/server.js
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise'; // mysql2 promise API
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';        /* dotenv : 개인정보(API 키, DB비번, JWT시크릿 등)를 외부 파일로 따로 관리 */
dotenv.config();            // .env파일 읽어오기
const app = express();
app.use(cors());            // React(localhost:5173) 요청 허용
app.use(express.json());    // req.body 에서 JSON 파싱

//-------------------------- 커넥션 풀 설정---------------------
const pool  = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'login_board',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit: 0,
});
//------------------------------------------------------------

// 1. 회원가입
app.post('/register', async(req,res)=>{
    try{
        const {id, password, email} = req.body;

        // 필수값 검사
        if (!id || !password || !email) {
        return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
        }
        // 비밀번호 해싱
        const hash = await bcrypt.hash(password, 10);

        // 중복 아이디 검사
        const[exists] = await pool.execute(
            'SELECT id FROM users WHERE id = ?',
            [id]
        );
        if(exists.length){
            return res.status(409).json({message: '이미 사용 중인 아이디입니다.' })
        }

        // 데이터 삽입
        await pool.execute(
            'INSERT INTO users (id, password, email) VALUES(?,?,?)',
            [id,hash,email] //hash로 db에 데이터 삽입하기 
        );
        return res.status(201).json({ id, email });
    }catch(err){
    console.log(err);
    return res.status(500).json({message : '서버 오류가 발생했습니다.'});
    }
});


// 2. 로그인
app.post('/login',async (req,res) =>{
    try{
        const {id,password} = req.body;
        const [rows] = await pool.execute(
            'SELECT password FROM users WHERE id = ?',
            [id]
        );
        if (!rows.length) {
            return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
        }
        const hash = rows[0].password;

        //평문 비밀번호와 해시 비교
        const isValid = await bcrypt.compare(password,hash);
        if(!isValid){
            return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
        }

        // JWT발급
        console.log('🔑 JWT_SECRET is:', process.env.JWT_SECRET);

        const token = jwt.sign(
            {id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        return res.json({ id, token });
    }catch(err){
        console.error(err);
        return res.status(500).json({message : '서버 오류가 발생했습니다.'});
    }
});

// 서버 시작
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
