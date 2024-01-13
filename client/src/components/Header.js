import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../store/user-context";
import yashlogo from '../images/yash-logo.svg';
import { API_PORT } from "../util/path";

export default function Header() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [isActive, setIsActive] = useState('');
    useEffect(() => {
        fetch(`${API_PORT}profile`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, []);

    function handleLogout() {
        fetch(`${API_PORT}logout`, {
            credentials: 'include',
            method: 'POST',
        })
        setUserInfo(null);
    }

    function handleActive(linkname) {
        if (linkname === 'login') {
            setIsActive('login')
        }
        if (linkname === 'register') {
            setIsActive('register')
        }
    }
    const userName = userInfo?.userName;
    const userProfile = userInfo?.profile;

    return <header>
        <Link to="/" className="logo">
            <img src={yashlogo} alt="" />
        </Link>
        <nav>
            {userName && (
                <>
                    <Link to="/create" className="create_post_btn">Create New Post</Link>
                    <a onClick={handleLogout}>Logout</a>
                    <div className="user_profile">
                        <p>hello ,{userName}</p>
                        <img src={userProfile} alt="user" />
                    </div>
                </>
            )}
            {!userName && (
                <>
                    <Link
                        to="/login"
                        onClick={() => handleActive('login')}
                        className={isActive === 'login' && 'active_btn'}
                    >Login</Link>
                    <Link
                        to="/register"
                        onClick={() => handleActive('register')}
                        className={isActive === 'register'&& 'active_btn'}
                    >Register</Link>
                </>
            )}
        </nav>
    </header>
}