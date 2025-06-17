// server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);    // /auth/register, /auth/login

app.listen(process.env.PORT||4000, () =>
  console.log(`Server running on http://localhost:${process.env.PORT||4000}`)
);
