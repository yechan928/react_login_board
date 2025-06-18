// server/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// .env 파일을 읽어서 process.env에 할당
dotenv.config();

export const pool = mysql.createPool({
  host:     process.env.DB_HOST,            // localhost
  user:     process.env.DB_USER,            // root
  password: process.env.DB_PASS,            // 1234
  database: process.env.DB_NAME,            // login_board
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});
