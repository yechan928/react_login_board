// client/src/pages/Register.jsx
import { useState } from "react";
import axios from 'axios'
import '../style/page/Register.css';

export default function Register(){

    // 1) state 선언: form 필드별로 state 관리
    const [id,setId] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirm,setConfirm ] = useState('');

    // 2) 폼 제출 핸들러
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (password != confirm){
            alert("비밀번호가 일치하지 않습니다!");
            return;
        }
        // 여기서 서버에 보낸다.
        try{
            const{data} = await axios.post('http://localhost:4000/auth/register',{
                id,password,email
            });
            alert(`회원가입 성공! 환영합니다. ${data.id}님`)

            // 성공 시 입력값 비우기
            setId('');
            setPassword('');
            setConfirm('');
            setEmail('');
            
        }catch(err){
            console.error(err);
            const message = err.response?.data?.message||'에러가 발생했습니다.';
            alert(`회원가입 실패:${message}`)
        }
        
        // // 여기서 서버에 보낼 준비를 한다. 
        // console.log({id, password,email});
        // alert('회원가입 정보 : ' + JSON.stringify({id, password,email}));
    }

    return (
        <div> 
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>아이디</label><br/>
                    <input 
                     type="id"
                     value={id}
                     onChange={e => setId(e.target.value)}
                     required/>
                </div>
                <div>
                    <label>비밀번호</label><br/>
                    <input
                    type="password"
                    value={password}
                    onChange={e =>setPassword(e.target.value)}
                    required/>
                </div>
                <div>
                    <label>비밀번호 확인</label><br/>
                    <input 
                     type="password"
                     value={confirm}
                     onChange={e => setConfirm(e.target.value)}
                     required/>
                </div>
                <div>
                    <label>이메일</label><br/>
                    <input 
                     type="email"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                     required/>
                </div>
                <button type="submit">가입하기 </button>
            </form>
        </div>
    )
}
