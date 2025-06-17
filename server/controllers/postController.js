// server/controllers/postController.js
import { pool } from '../db.js';    // 이미 있는 db.js


/* 게시글 목록 조회 핸들러 - GET /posts */
export async function list(req, res) {
  try { 
   // posts 테이블에서 id·title·author_id·created_at만 꺼내서 최신순으로 정렬
    const [rows] = await pool.query(
      'SELECT id, title, author_id, created_at FROM posts ORDER BY created_at DESC'
    );
    return res.json(rows);
  } catch (err) {
    console.error('게시글 목록 조회 오류 ▶', err);
    return res.status(500).json({ message: '게시글 목록 조회 실패' });
  }
}
