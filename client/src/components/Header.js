import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [userName, setUserName] = useState(null);
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
                setUserName(userInfo.userName);
            })
        })
    }, []);

    function handleLogout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        })
        setUserName(null);
    }

    return <header>
        <Link to="/" className="logo">Yash-Blog</Link>
        <nav>
            {userName && (
                <>
                    <Link to="/create">Create New Post</Link>
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