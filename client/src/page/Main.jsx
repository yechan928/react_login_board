// client/src/page/Main.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/page/Main.css';

export default function Main() {
  const navigate = useNavigate();

  const handleStart = () => {
    // PrivateRoute 에서도 체크하지만, 혹시 모르니 한 번 더:
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // 실제 게시판 같은 다음 페이지로 이동
      navigate('/board'); // <Route path="/board" element={<Board />} /> 같은 걸 추가하세요
    }
  };

  return (
    <div className="main-wrap">
      <div className="card">
        <h2>환영합니다!</h2>
        <p>React와 Node.js로 만든 로그인 게시판 예제입니다.</p>
        <button className="btn-start" onClick={handleStart}>
          시작하기
        </button>
      </div>
    </div>
  );
}
