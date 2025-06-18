// server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import postsRouter from './routes/post.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);    // 기존 로그인·회원가입
app.use('/post', postsRouter)    // 이번에 만든 게시판

app.listen(process.env.PORT||4000, () =>
  console.log(`Server running on http://localhost:${process.env.PORT||4000}`)
);
