import { useState } from "react";
export function useInput(defaultValue, validationFn) {
    const [enterUserData, setEnterUserData] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enterUserData);

    function handleUserInput(event) {
        setEnterUserData(event.target.value);
        setDidEdit(false);
    }

    function handleBlur() {
        setDidEdit(true);
    }

    return {
        value: enterUserData,
        handleUserInput,
        handleBlur,
        hasError: didEdit && !valueIsValid,
    }
}