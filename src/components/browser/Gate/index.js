import React, { useEffect,useState } from 'react';
import { useHistory, Route } from 'react-router-dom';
import { useCookies } from "react-cookie";
import Login from '../Login';
import {menu} from "./data.js";

import "./style.scss";

function Gate() {
    const history = useHistory();
    const [userId, setUserId] = useState(sessionStorage.getItem('user_id'));
    const [cookies, setCookie, removeCookie] = useCookies(['loginCookie']);
    const [menuList, setMenuList] = useState([...menu]);
    const [headerTxt, setHeaderTxt] = useState(menu[0].name);

    const onLogout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")){
            sessionStorage.removeItem('user_id');
            removeCookie('loginCookie');
            document.location.href = "/";
        }
    }

    const moveMenu = (obj) => {
        menuAct();
        history.push(obj.path);
    }
    
    const menuAct = () => {
        const temp = JSON.parse(JSON.stringify(menu));
        for (let i = 0; i < temp.length; i++) {
            if(history.location.pathname === temp[i].path){
                temp[i].act = "on";
                setMenuList(temp);
                setHeaderTxt(temp[i].name);
            }
        }
    }

    useEffect(() => {
        if(history.location.pathname === '/admin'){
            history.push(menuList[0].path);
        }
        menuAct();
    }, [history.location.pathname]);
  
    if(sessionStorage.getItem('user_id') != 'admin'){
        history.push("/admin/login");
        return (
            <Login />
        )
    }else{
        return (
            <div className="gate">
                <div className="admin_lef_box fl_lef">
                    <div className="topBox">
                    </div>
                    <div className="titleBox">
                        <img className="userImg" src="/images/userImg.png"/>
                        <p>관리자님</p>
                    </div>
                    <div className="titBox">
                        { menuList && menuList.map(function(obj, i){
                            return(
                                <h5 key={obj.idx} className={"tit cur_point " + obj.act}   onClick={() => moveMenu(obj)}>▸ {obj.name}</h5>
                            )
                        })}
                    </div>
                    <div className="bottomBox">
                        <div className="adminOutBox" onClick={onLogout}>
                            <span>로그아웃</span>
                        </div>
                    </div>
                </div>
                <div className="boxInner">
                    <div className="adminBox">
                        <h5 className="adminTit">{headerTxt}</h5>
                        <hr/>
                        <div>
                            { menuList && menuList.map(function(obj, i){
                                return(
                                    <Route path={obj.path} component={obj.compor}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Gate;
