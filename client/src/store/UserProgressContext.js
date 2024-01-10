import { createContext, useState } from "react";

//step1: create Context
const UserProgressContext = createContext({
    progress: '',
    showModal: () => { },
    hideModal: () => { },
})

//step2: Create Context Provider
export function UserProgressContextProvider({ children }) {
    //

    const [userProgress, setUserProgress] = useState('');

    // step6: define method
    function showModal(modaltext) {
        setUserProgress(modaltext);
    }
    function hideModal() {
        setUserProgress('');
    }

    //step7: initialize value to context
    const userProgressCtx = {
        progress: userProgress,
        showModal,
        hideModal,
    }
    //step4: return context provider with children and value
    return <UserProgressContext.Provider value={userProgressCtx}>
        {children}
    </UserProgressContext.Provider>
}

//step3: export contect as default
export default UserProgressContext;