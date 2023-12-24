import { useState } from "react"

export default function LoginPage() {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    async function login(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ userName, userPassword }),
            headers: { 'Content-Type': 'application/json' }
        });

    }
    return <form onSubmit={login} className="login">
        <h1>Login</h1>
        <input
            type="text"
            placeholder="username"
            value={userName}
            onChange={(event) => { setUserName(event.target.value) }}
        />
        <input
            type="password"
            placeholder="password"
            value={userPassword}
            onChange={(event) => { setUserPassword(event.target.value) }}
        />
        <button>Login</button>
    </form>
}