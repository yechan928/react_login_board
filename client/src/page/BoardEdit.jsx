// client/src/page/BoardEdit.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/page/BoardEdit.css'; // 나중에 스타일링

export default function BoardEdit() {
  const { id } = useParams();       // 1) URL 에서 게시글 ID 가져오기
  const navigate = useNavigate();   // 2) 수정 후 목록/상세로 이동
  const [title,   setTitle]   = useState(''); 
  const [content, setContent] = useState('');

  useEffect(() => {
    // TODO: 3) 이곳에 detail API 호출해서 title/content 초기화
    // 1) 글 상세 조회 API 호출
   axios
     .get(`http://localhost:4000/post/${id}`)
     .then(res => {
       // 2) 응답에서 title과 content를 꺼내 상태에 세팅
       setTitle(res.data.title);
       setContent(res.data.content);
     })
     .catch(err => {
       console.error('게시글 로드 실패 ▶', err);
       alert('게시글을 불러올 수 없습니다.');
       navigate('/boardlist');
     });
  }, [id]);

// 수정 폼 제출 핸들러 - handleSubmit 에서 PUT 요청 구현
 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     await axios.put(
       `http://localhost:4000/post/${id}`,
       { title, content },
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`
         }
       }
     );
     // 4) 수정 성공 시 상세보기 페이지로 이동
     navigate(`/board/${id}`);
   } catch (err) {
     console.error('게시글 수정 실패 ▶', err);
     alert('수정에 실패했습니다.');
   }
 };
  return (
    <div className="board-edit-container">
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>제목</label>
          <input 
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea
            rows="10"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}
