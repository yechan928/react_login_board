import React,{useState} from 'react'
import { Routes, Route } from 'react-router-dom'

import Main     from './page/Main';
import Login    from './page/Login';
import Register from './page/Register';
import BoardList  from './page/BoardList' ;
import BoardDetail from './page/BoardDetail';
import BoardCreate from './page/BoardCreate';
import BoardEdit from './page/BoardEdit';

import './style/global.css'
import './App.css'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userId, setUserId] = useState(localStorage.getItem('userId'))

  // 로그인 성공 시 token, userId 둘 다 업데이트
  const handleLogin  = (newToken, newUserId) =>{
    setToken(newToken)
    setUserId(newUserId)
  }

  // **로그아웃 전용 콜백**: state + localStorage 모두 초기화
  const handleLogout = () =>{
    setToken(null)
    setUserId(null)
    localStorage.removeItem('token')  
    localStorage.removeItem('userId')
  }


  return (
    <Routes>
      <Route path="/"        element={<Main token ={token} userId = {userId} onLogout = {handleLogout} />} />
      <Route path="/login"   element={<Login  onLogin={handleLogin}/>} />
      <Route path="/register"element={<Register />} />
      <Route path="/boardlist" element={<BoardList />} />
      <Route path="/board/:id"  element={<BoardDetail/>}/>
      <Route path="/board/create" element={<BoardCreate/>}/>
      <Route path="/board/:id/edit" element={<BoardEdit/>}/>
    </Routes>
  )
}
