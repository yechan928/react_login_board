import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style/page/Main.css'

export default function Main({token, userId, onLogout}) {
    const navigate = useNavigate()

    const handleStart = () => {
    navigate(token ? '/' : '/login')
    }
    
    const handleLogout = () =>{
        onLogout()
        navigate('/')       // 로그아웃 후 메인
    }


  return (
    <div className="main-container">
      {/* ── 글로벌 헤더 ───────────────── */}
      <header className="global-header">
        <h1 className="logo"><Link to="/">LoginBoard</Link></h1>
        <nav className="global-nav">
          <Link to="/">메인</Link>
          {!token && <Link to="/login">로그인</Link>}
          {!token && <Link to="/register">회원가입</Link>}
          {token && <span className="welcome">환영합니다. {userId}님</span>}
          {token  && <button className="btn-logout" onClick={handleLogout}>로그아웃</button>}
          {token  && <Link to="/boardlist">게시판</Link>}
        </nav>
      </header>

      {/* ── 히어로 배너 ───────────────── */}
      <section className="hero">
        <h2>React + Node.js 로그인 게시판에 오신 것을 환영합니다!</h2>
        <button className="cta" onClick={handleStart}>
          시작하기
        </button>
      </section>

      {/* ── 특징 섹션 ─────────────────── */}
      <section className="features">
        {[
          { icon: '🔒', label: '안전한 인증' },
          { icon: '⚡', label: '빠른 속도' },
          { icon: '📱', label: '반응형 UI' },
          { icon: '🎨', label: '간편한 스타일링' },
        ].map((f) => (
          <div key={f.label} className="feature-card">
            <div className="icon">{f.icon}</div>
            <div className="label">{f.label}</div>
          </div>
        ))}
      </section>

      {/* ── 푸터 ─────────────────────── */}
      <footer className="main-footer">
        © 2025 LoginBoard &nbsp;|&nbsp;
        <a href="/terms">이용약관</a> &nbsp;|&nbsp;
        <a href="/privacy">개인정보처리방침</a>
      </footer>
    </div>
  )
}
