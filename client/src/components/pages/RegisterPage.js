import { useState } from "react"
import { API_PORT } from "../../util/path";

export default function RegisterPage() {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    async function register(event) {
        event.preventDefault();

        const response = await fetch(`${API_PORT}register`, {
            method: 'POST',
            body: JSON.stringify({ userName, userPassword }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        if (response.status === 200) {
            alert("Registration Successfull");
        } else {
            alert("Registration Failed");
        }
        setUserName('');
        setUserPassword('');
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