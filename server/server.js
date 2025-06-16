// login-board/server/server.js
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise'; // mysql2 promise API

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

// 1. 회원가입 엔드포인트
app.post('/register', async(req,res)=>{
    try{
        const {id, password, email} = req.body;

        // 필수값 검사
        if (!id || !password || !email) {
        return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
        }

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
            [id,password,email]
        );
        return res.status(201).json({ id, email });
    }catch(err){
    console.log(err);
    return res.status(500).json({message : '서버 오류가 발생했습니다.'});
    }
});


// 2. 로그인 엔드포인트
app.post('/login',async (req,res) =>{
    try{
        const {id,password} = req.body;
        const [rows] = await pool.execute(
            'SELECT id FROM users WHERE id = ? AND password = ?',
            [id, password]
        );
        if (!rows.length) {
            return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
        }
        return res.json({ id : rows[0].id });
    }catch(err){
        console.error(err);
        return res.status(500).json({message : '서버 오류가 발생했습니다.'});
    }
});

// // 기존 루트 라우트
// app.get('/', (req, res) => {
//   res.send('Hello from Express!');
// });

// 서버 시작
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
