// client/src/page/BoardDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/page/BoardDetail.css';  // 스타일링용

export default function BoardDetail() {
    const { id } = useParams();                 // URL 파라미터에서 글 ID 추출
    const navigate = useNavigate();             // 목록으로 돌아가기용
    const [post, setPost] = useState(null);     // 글 데이터 상태

    // 현재 로그인한 사용자 ID (localStorage 저장된 값)
    const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    // 1) 글 세부 정보 API요청
    axios
      .get(`http://localhost:4000/post/${id}`)  
      .then(res => setPost(res.data))
      .catch(err => {
        console.error('상세 조회 실패 ▶', err);
        alert('게시글을 불러올 수 없습니다.');
        navigate('/boardlist');
      });
  }, [id, navigate]);

  if (!post) {
    // 2) 데이터 로딩 중 간단 표시
    return <p>로딩 중...</p>;
  }
  
  // 삭제 핸들러
  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await axios.delete(
        `http://localhost:4000/post/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      navigate('/boardlist');
    } catch (err) {
      console.error('삭제 실패 ▶', err);
      alert('삭제에 실패했습니다.');
    }
  };
 
  return (
    <div className="board-detail-container">
        <h2>{post.title}</h2>
        <div className="meta">
            작성자: {post.author_id} | 작성일: {new Date(post.created_at).toLocaleString()}
        </div>
        <div className="content">
            {post.content}
        </div>
        
        {/* 작성자와 현재 사용자가 같을 때만 수정 버튼 표시 */}
        {post.author_id === currentUserId && (
        <button onClick={() => navigate(`/board/${id}/edit`)}>
            수정
        </button>
        )}
        
        {/* 삭제 버튼 (작성자 본인만) */}
        {post.author_id === currentUserId && (
        <button className="delete" onClick={handleDelete}>
          삭제
        </button>
        )}

      <button onClick={() => navigate('/boardlist')}>목록으로 돌아가기</button>
    </div>
  );
}
