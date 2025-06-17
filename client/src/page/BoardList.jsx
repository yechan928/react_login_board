// client/src/page/BoardList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../style/page/BoardList.css';

export default function BoardList() {
    // 1) 컴포넌트 상태: 서버에서 받아올 게시글 목록
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 2) 페이지가 마운트(=로드)되면 한 번만 실행
    // 서버('/post')의 API에서 게시글 목록 불러오기 
    axios
      .get('http://localhost:4000/post')
      .then(res => setPosts(res.data))              // 3) 성공 시 response.data를 상태에 저장
      .catch(err => console.error('Failed to fetch posts ▶', err));     // 4) 에러 시 콘솔에 상세 로그
  }, []);

  return (
    <div className="board-list-container">
      <h2>게시판 목록</h2>
      {posts.length === 0 ? (<p>게시글이 없습니다.</p>) : 
      ( <ul>
            {posts.map(post => (
            <li key={post.id}>
                <strong>{post.title}</strong>
                <span>
                    by {post.author_id} at{' '}
                    {new Date(post.created_at).toLocaleString()}
                </span> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
