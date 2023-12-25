import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
    }, []);

    return <header>
        <Link to="/" className="logo">Yash-Blog</Link>
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    </header>
}