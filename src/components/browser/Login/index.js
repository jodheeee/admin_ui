import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";

import './style.scss';

function Login() {
    // 로그인 유지
    const [cookies, setCookie, removeCookie] = useCookies(['loginCookie','rememberId']);
    const [keepLogin, setkeepLogin] = useState(false);
    const keepLoginHandler = ({ target }) => {
        setkeepLogin(!keepLogin);
    };
    const [ckImg , setCkImg] = useState("/images/ck.png");

    // 로그인 데이터
    const [inputId, setInputId] = useState('');
    const handleInputId = (e) => {
        setInputId(e.target.value);
    }
    const [inputPw, setInputPw] = useState('');
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    // 일반 로그인 버튼
    const onClickLogin = () => {
        // axios.post(APIPATH + '/user/login', null, {
        //     params: {
        //         'user_id': inputId,
        //         'user_pw': inputPw
        //     }
        // })
        // .then(res => {
        //     if(res.data.userId === undefined){
        //         alert('입력하신 아이디가 일치하지 않습니다.');
        //     } else if(res.data.userId === null){
        //         alert('입력하신 비밀번호가 일치하지 않습니다.');
        //     } else if(res.data.userId === inputId) {
        //         sessionStorage.setItem('user_id', inputId);
        //         sessionStorage.setItem('user_nick', res.data.userNick);
        //         if(keepLogin){
        //             setCookie('rememberId', inputId);
        //         }else{
        //             removeCookie('rememberId');
        //         }
        //         document.location.href = '/admin';
        //     }
        // }).catch()
    }  

    const imgChange = () => {
        if(ckImg != "/images/ck.png"){
            setCkImg("/images/ck.png");
        }else{
            setCkImg("/images/ck.on.png");
        }
        setkeepLogin(!keepLogin);
    }

    useEffect(() => {
        if(cookies.rememberId){
            setCkImg("/images/ck.on.png");
            setkeepLogin(true);
            setInputId(cookies.rememberId);
        }
    }, []);

    return (
        <div className="loginPage">
            <div className="inner">
                <div className="login">
                    <h1>LOGIN</h1>
                    <div className="loginBox">
                        <div className="inputBox">
                            <input type="text" placeholder="아이디를 입력하세요" value={inputId} onChange={handleInputId}/>
                        </div>
                        <div className="inputBox"> 
                            <input type="password" placeholder="비밀번호를 입력하세요" onChange={handleInputPw}
                              onKeyPress={(e) => {
                                if(e.key == 'Enter'){
                                  onClickLogin();
                                }
                            }}/>
                        </div>
                    </div>
                    <div className="ckBox">
                          <img className="ckImg" src={ckImg} onClick={imgChange}/>
                          <span>아이디 저장</span>
                    </div>
                    <div className="loginBtBox">
                        <div className="loginBt cur_point" onClick={onClickLogin}>
                            로그인
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Login;
