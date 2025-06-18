// client/src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/page/Main.css'; // 기존 Main.css에 헤더 스타일이 포함되어 있으니 재사용

export default function Header({ token, userId, onLogout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="global-header">
      <h1 className="logo"><Link to="/">LoginBoard</Link></h1>
      <nav className="global-nav">
        <Link to="/">메인</Link>
        {!token && <Link to="/login">로그인</Link>}
        {!token && <Link to="/register">회원가입</Link>}
        {token && <Link to="/board">게시판</Link>}
        {token && <span className="welcome">환영합니다. {userId}님</span>}
        {token && <button className="btn-logout" onClick={handleLogout}>로그아웃</button>}
      </nav>
    </header>
  );
}
