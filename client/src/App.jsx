// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './page/Register';
import Login    from './page/Login';

function App() {
  return (
    <BrowserRouter>
        <nav>
            <Link to="/register">회원가입</Link>
            <Link to="/login">로그인</Link>
        </nav>
        <Routes>
            <Route path="/" element = { <h1>메인 페이지 </h1>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
