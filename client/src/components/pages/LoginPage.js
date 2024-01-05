import { useContext, useState } from "react";
import { Navigate } from 'react-router-dom';
import { UserContext } from "../../store/user-context";
import { API_PORT } from "../../util/path";

export default function LoginPage() {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { userInfo, setUserInfo } = useContext(UserContext);

    async function login(event) {
        event.preventDefault();

        const response = await fetch(`${API_PORT}login`, {
            method: 'POST',
            body: JSON.stringify({ userName, userPassword }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                console.log("yes")
                setRedirect(true);
            })
        } else {
            alert('Wrong Credentials');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
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