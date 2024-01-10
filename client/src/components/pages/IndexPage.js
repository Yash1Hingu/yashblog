import { useContext, useEffect, useState } from "react";
import Post from "../Post";
import { API_PORT } from "../../util/path";
import UserProgressContext from "../../store/UserProgressContext";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    const userProgressCtx = useContext(UserProgressContext);
    useEffect(() => {
        fetch(`${API_PORT}post`).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            })
        })
    }, [])
    return <>
        {posts.length === 0 && userProgressCtx.showModal('Loading')}
        {posts.length > 0 && userProgressCtx.hideModal()}
        {posts.length > 0 && posts.map(post => (
            <Post {...post} key={post._id} />
        ))}
    </>
}