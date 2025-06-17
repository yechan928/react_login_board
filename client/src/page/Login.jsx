// client/src/pages/Login.jsx
import { useState } from "react";
import axios from 'axios'

function Login(){

    // 1) state 선언: form 필드별로 state 관리
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    // 2) 폼 제출 핸들러
    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            const{data} = await axios.post('http://localhost:4000/login',{
                id,password
            });
            console.log('🔍 data:', data);
            console.log('🔍 data.id:', data.id);
            // 로그인 성공 :  token 저장
            alert(`로그인 성공! ${data.id}님`)
            localStorage.setItem('token',data.token);  


            // 성공 시 입력값 비우기
            setId('');
            setPassword('');
        }catch(err){
            console.error(err);
            const message = err.response?.data?.message||'에러가 발생했습니다.';
            alert(`로그인 실패:${message}`)
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>아이디</label><br/>
                    <input 
                     type="text"
                     value={id}
                     onChange={e=>setId(e.target.value)}
                     required/>
                </div>
                <div>
                    <label>비밀번호</label><br/>
                    <input 
                     type="password"
                     value={password}
                     onChange={e=>setPassword(e.target.value)}
                     required/>
                </div>
                <button type="submit">로그인</button>
            </form>
        </div>
    )
}

export default Login;