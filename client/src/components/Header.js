import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../store/user-context";

export default function Header() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
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
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        })
        setUserInfo(null);
    }

    const userName = userInfo?.userName;

    return <header>
        <Link to="/" className="logo">Yash-Blog</Link>
        <nav>
            {userName && (
                <>
                    <Link to="/create">Create New Post</Link>
                    <a onClick={handleLogout}>Logout</a>
                    <p>{userName}</p>
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