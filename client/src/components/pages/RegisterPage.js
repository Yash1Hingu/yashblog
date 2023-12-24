import { useState } from "react"

export default function RegisterPage() {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    async function register(event) {
        event.preventDefault();

        await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ userName, userPassword }),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    return <form onSubmit={register} className="register">
        <h1>Register</h1>
        <input type="text"
            name="username"
            placeholder="username"
            value={userName}
            onChange={(event) => { setUserName(event.target.value) }}
        />
        <input type="password"
            name="password"
            placeholder="password"
            value={userPassword}
            onChange={(event) => { setUserPassword(event.target.value) }} />
        <button>Register</button>
    </form>
}