// server/routes/posts.js

import express from 'express';
import { list, detail,create,update,remove } from '../controllers/postController.js';
import { verifyToken } from '../middlewares/auth.js';


const router = express.Router();

// 목록 조회
router.get('/', list);
// 단건 조회
router.get('/:id', detail);           
// 글 작성 (인증 필요)
router.post('/', verifyToken, create);
// 글 수정
router.put('/:id', verifyToken, update);
// 글 삭제
router.delete('/:id', verifyToken, remove);
export default router;
