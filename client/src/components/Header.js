import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../store/user-context";
import yashlogo from '../images/yash-logo.svg';
import { API_PORT } from "../util/path";

export default function Header() {
    const { userInfo, setUserInfo } = useContext(UserContext);
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

    const userName = userInfo?.userName;

    return <header>
        <Link to="/" className="logo">
            <img src={yashlogo} alt="" />
        </Link>
        <nav>
            {userName && (
                <>
                    <p>hello ,{userName}</p>
                    <Link to="/create" className="create_post_btn">Create New Post</Link>
                    <a onClick={handleLogout}>Logout</a>
                </>
            )}
            {!userName && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    </header>
}