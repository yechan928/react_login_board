// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Main     from './page/Main';
import Login    from './page/Login';
import Register from './page/Register';

import './style/global.css';
import './App.css';

function PrivateRoute({children}){
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <BrowserRouter>
      <header className="site-header">
        <div className="wrapper">
          <h1 className="logo">LoginBoard</h1>
          <nav className="main-nav">
            <Link to="/">메인</Link>
            <Link to="/login">로그인</Link>
            <Link to="/register">회원가입</Link>
          </nav>
        </div>
      </header>

      <main className="site-content">
        <div className="wrapper">
          <Routes>
            <Route path="/" element={         
              <PrivateRoute>
                <Main />
              </PrivateRoute>} />  
            <Route path="/login"   element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </main>

      <footer className="site-footer">
        <div className="wrapper">
          © 2025 LoginBoard
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
