import { useState } from "react"
import { API_PORT } from "../../util/path";
import { Navigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { hasMinLength, isEmail, isNotEmpty } from "../../util/validation";
import Input from "../UI/Input";

export default function RegisterPage() {
    const {
        value: userName,
        handleUserInput: handleuserNameInput,
        handleBlur: handleuserNameBlur,
        hasError: userNameIsValid
    } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

    const {
        value: userPassword,
        handleUserInput: handleuserPasswordInput,
        handleBlur: handleuserPasswordBlur,
        hasError: userpasswordIsValid
    } = useInput("", (value) => hasMinLength(value, 8) && isNotEmpty(value));

    // const [userName, setUserName] = useState('');
    // const [userPassword, setUserPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function register(event) {
        event.preventDefault();

        if (userNameIsValid || userpasswordIsValid) {
            return;
        }
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
    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return <form onSubmit={register} className="register">
        <h1>Register</h1>
        <Input
            label="Username"
            id="username"
            type="text"
            name="username"
            placeholder="user@gmail.com"
            onBlur={handleuserNameBlur}
            onChange={handleuserNameInput}
            value={userName}
            error={userNameIsValid && "Please Enter Valid Email."}
            required
        />
        <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            placeholder="********"
            onBlur={handleuserPasswordBlur}
            onChange={handleuserPasswordInput}
            value={userPassword}
            error={userpasswordIsValid && "Please Enter Valid Password."}
            required
        />
        {/* <input type="text"
            name="username"
            placeholder="username"
            value={userName}
            onChange={(event) => { setUserName(event.target.value) }}
            required
        />
        <input type="password"
            name="password"
            placeholder="password"
            value={userPassword}
            onChange={(event) => { setUserPassword(event.target.value) }}
            required
        /> */}
        <button>Register</button>
    </form>
}