// client/src/page/BoardCreate.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/page/BoardCreate.css';  

export default function BoardCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');       // 제목 입력 상태
  const [content, setContent] = useState('');   // 내용 입력 상태

  // 1) 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 2) API 호출: POST /post
      await axios.post(
        'http://localhost:4000/post', 
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      // 3) 작성 성공 후 목록으로 이동
      navigate('/boardlist');
    } catch (err) {
      console.error('게시글 작성 실패 ▶', err);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="board-create-container">
      <h2>새 글 작성</h2>
      <form onSubmit={handleSubmit}>
        {/* 제목 입력 */}
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        {/* 내용 입력 */}
        <div className="form-group">
          <label>내용</label>
          <textarea
            rows="10"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>
        {/* 제출 버튼 */}
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
}
