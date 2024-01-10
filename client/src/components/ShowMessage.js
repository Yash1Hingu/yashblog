import Modal from "./UI/Modal"
import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext";
export default function ShowMessage() {
    const userProgressCtx = useContext(UserProgressContext);
    return <Modal
    open={userProgressCtx.progress} 
    className={`${userProgressCtx.progress === 'Loading' && ' loading'}`}
    >
        {userProgressCtx.progress === 'Loading' ? (
            <div className="loader"></div>
        ) :
            <>
                <h3>{userProgressCtx.progress}</h3>
                <button onClick={() => userProgressCtx.hideModal()}>ok</button>
            </>
        }
    </Modal>
}