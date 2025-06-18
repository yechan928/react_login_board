// server/controllers/authController.js

import { pool } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/* 회원가입 핸들러:  POST /auth/register */
export async function register(req, res) {
  try {
    const { id, password, email } = req.body;

    // 1) 필수값 검사
    if (!id || !password || !email) {
      return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }

    // 2) 중복 아이디 검사
    const [exists] = await pool.execute(
      'SELECT id FROM users WHERE id = ?',
      [id]
    );
    if (exists.length) {
      return res.status(409).json({ message: '이미 사용 중인 아이디입니다.' });
    }

    // 3) 비밀번호 해싱
    const hash = await bcrypt.hash(password, 10);

    // 4) 사용자 데이터 삽입
    await pool.execute(
      'INSERT INTO users (id, password, email) VALUES (?, ?, ?)',
      [id, hash, email]
    );

    // 5) 성공 응답
    return res.status(201).json({ id, email });
  } catch (err) {
    console.error('Register Error ▶', err);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}

/* 로그인 핸들러 : POST /auth/login */
export async function login(req, res) {
  try {
    const { id, password } = req.body;

    // 1) 필수값 검사
    if (!id || !password) {
      return res.status(400).json({ message: '아이디와 비밀번호를 입력해주세요.' });
    }

    // 2) 사용자 조회
    const [rows] = await pool.execute(
      'SELECT password FROM users WHERE id = ?',
      [id]
    );
    if (!rows.length) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }

    // 3) 비밀번호 검증
    const hash = rows[0].password;
    const isValid = await bcrypt.compare(password, hash);
    if (!isValid) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }

    // 4) JWT 발급
    const token = jwt.sign(
      { id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 5) 성공 응답
    return res.json({ id, token });
  } catch (err) {
    console.error('Login Error ▶', err);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}
