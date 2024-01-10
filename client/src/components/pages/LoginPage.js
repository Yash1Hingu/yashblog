import { useContext, useState } from "react";
import { Navigate } from 'react-router-dom';
import { UserContext } from "../../store/user-context";
import { API_PORT } from "../../util/path";
import Input from "../UI/Input";
import { useInput } from "../hooks/useInput";
import { isEmail, isNotEmpty, hasMinLength } from '../../util/validation.js';
import UserProgressContext from "../../store/UserProgressContext.js";

export default function LoginPage() {
    const userProgressCtx = useContext(UserProgressContext);
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

    const [redirect, setRedirect] = useState(false);
    const { userInfo, setUserInfo } = useContext(UserContext);

    async function login(event) {
        event.preventDefault();
        
        if(userNameIsValid || userpasswordIsValid){
            return;
        }
        userProgressCtx.showModal('Loading');
        const response = await fetch(`${API_PORT}login`, {
            method: 'POST',
            body: JSON.stringify({ userName, userPassword }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        userProgressCtx.hideModal();
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
        } else {
            response.json().then(isvalid => {
                if (isvalid.message === "invalid_username") {
                    userProgressCtx.showModal('Invalid User Name');
                    
                } else if (isvalid.message === "invalid_userpassword") {
                    userProgressCtx.showModal('Invalid User Password');
                }
            })
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return <form onSubmit={login} className="login">
        <h1>Login</h1>
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
        <button>Login</button>
    </form>
}