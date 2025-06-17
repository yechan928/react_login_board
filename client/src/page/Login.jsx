// client/src/pages/Login.jsx
import  React ,{ useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import '../style/page/Login.css';

function Login({onLogin}){

    // 1) state 선언: form 필드별로 state 관리
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // 2) 폼 제출 핸들러
    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            const{data} = await axios.post('http://localhost:4000/auth/login',{
                id,password
            });
            // 로그인 성공 :  token 저장
            localStorage.setItem('token',data.token);
            localStorage.setItem('userId',data.id);
            onLogin(data.token,data.id);   
            alert(`로그인 성공! ${data.id}님`)

            // 성공 시 입력값 비우기
            setId('');
            setPassword('');
            navigate('/'); //로그인 후 바로 메인 페이지로             
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
            <p>아직 계정이 없으신가요?<Link to = '/register'>회원가입</Link></p>
        </div>
    )
}

export default Login;