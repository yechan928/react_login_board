// client/src/page/BoardDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/page/BoardDetail.css';  // 이후 스타일링할 때 사용

export default function BoardDetail() {
  const { id } = useParams();        // URL 파라미터에서 글 ID 추출
  const navigate = useNavigate();    // 목록으로 돌아가기용
  const [post, setPost] = useState(null);

  useEffect(() => {
    // 1) 컴포넌트 마운트 시 글 세부 정보 요청
    axios
      .get(`http://localhost:4000/post/${id}`)  // 서버 마운트 경로에 따라 '/post' 혹은 '/posts'
      .then(res => setPost(res.data))
      .catch(err => {
        console.error('상세 조회 실패 ▶', err);
        alert('게시글을 불러올 수 없습니다.');
        navigate('/board');
      });
  }, [id, navigate]);

  if (!post) {
    // 2) 데이터 로딩 중 간단 표시
    return <p>로딩 중...</p>;
  }

  return (
    <div className="board-detail-container">
      <h2>{post.title}</h2>
      <div className="meta">
        작성자: {post.author_id} | 작성일: {new Date(post.created_at).toLocaleString()}
      </div>
      <div className="content">
        {post.content}
      </div>
      <button onClick={() => navigate('/board')}>목록으로 돌아가기</button>
    </div>
  );
}
