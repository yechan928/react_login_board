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

/* 게시글 단건 조회 핸들러 - GET /post/:id */
export async function detail(req, res) {
  const { id } = req.params;
  try {
   
    // 1) 해당 ID의 게시글을 DB에서 조회
    const [rows] = await pool.query(
      'SELECT id, title, content, author_id, created_at FROM posts WHERE id = ?',
      [id]
    );   

    // 2) 조회 결과가 없으면 404 Not Found 응답
    if (!rows.length) {
      return res.status(404).json({ message: '게시글이 없습니다.' });
    }

    // 3) 게시글 객체 하나를 JSON 형태로 반환
    return res.json(rows[0]);
  } catch (err) {

    // 4) 예기치 않은 에러 발생 시 로그 출력 후 500 Internal Server Error 응답
    console.error('게시글 상세 조회 오류 ▶', err);
    return res.status(500).json({ message: '게시글 조회 실패' });
  }
}