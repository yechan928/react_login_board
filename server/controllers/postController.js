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

/* 게시글 작성 핸들러 - POST /post */
export async function create(req, res) {
  try {
    // 클라이언트가 보낸 제목과 내용
    const { title, content } = req.body;
    // verifyToken 미들웨어로부터 주입된 로그인한 사용자 ID
    const authorId = req.user.id;

    // 1) 유효성 검사
    if (!title || !content) {
      return res.status(400).json({ message: '제목과 내용을 모두 입력하세요.' });
    }

    // 2) DB에 INSERT
    const [result] = await pool.query(
      'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
      [title, content, authorId]
    );

    // 3) 생성된 글 ID와 함께 응답
    return res.status(201).json({
      id: result.insertId,
      title,
      content,
      author_id: authorId,
      created_at: new Date()
    });
  } catch (err) {
    console.error('게시글 작성 오류 ▶', err);
    return res.status(500).json({ message: '게시글 작성 실패' });
  }
}
/* 게시글 수정 핸들러 - PUT /post/:id */
export async function update(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  const authorId = req.user.id;

  // 1) 필수값 검사
  if (!title || !content) {
    return res.status(400).json({ message: '제목과 내용을 모두 입력하세요.' });
  }

  try {
    // 2) 작성자 확인
    const [rows] = await pool.query(
      'SELECT author_id FROM posts WHERE id = ?', [id]
    );
    if (!rows.length) {
      return res.status(404).json({ message: '게시글이 없습니다.' });
    }
    if (rows[0].author_id !== authorId) {
      return res.status(403).json({ message: '수정 권한이 없습니다.' });
    }

    // 3) 업데이트 실행
    await pool.query(
      'UPDATE posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, content, id]
    );

    // 4) 성공 응답
    return res.json({ message: '수정 완료' });
  } catch (err) {
    console.error('게시글 수정 오류 ▶', err);
    return res.status(500).json({ message: '게시글 수정 실패' });
  }
}

/* 게시글 삭제 핸들러 - DELETE /post/:id */
export async function remove(req, res) {
  const { id } = req.params;
  const authorId = req.user.id;

  try {
    // (1) 글 존재 여부 & 작성자 검증
    const [rows] = await pool.query(
      'SELECT author_id FROM posts WHERE id = ?',
      [id]
    );
    if (!rows.length) {
      return res.status(404).json({ message: '게시글이 없습니다.' });
    }
    if (rows[0].author_id !== authorId) {
      return res.status(403).json({ message: '삭제 권한이 없습니다.' });
    }

    // (2) 실제 삭제
    await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    return res.json({ message: '삭제 완료' });
  } catch (err) {
    console.error('게시글 삭제 오류 ▶', err);
    return res.status(500).json({ message: '게시글 삭제 실패' });
  }
}