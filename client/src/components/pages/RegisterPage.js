import { useState } from "react"
import { API_PORT } from "../../util/path";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function register(event) {
        event.preventDefault();

        const response = await fetch(`${API_PORT}register`, {
            method: 'POST',
            body: JSON.stringify({ userName, userPassword }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        if (response.status === 200) {
            setRedirect(true);
        } else {
            alert("Registration Failed");
        }
        setUserName('');
        setUserPassword('');
    }

    if (redirect) {
        return <Navigate to={'/login'} />
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