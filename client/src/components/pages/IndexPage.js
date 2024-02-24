import { useContext, useEffect, useState } from "react";
import Post from "../Post";
import { API_PORT } from "../../util/path";
import UserProgressContext from "../../store/UserProgressContext";
import Loader from "../UI/Loader";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch(`${API_PORT}post`).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            })
        })
        document.title = "Home | Yash Blogs"
    }, [])
    return <>
        {posts.length === 0 && (<><Loader height='150px' /><Loader height='150px' /><Loader height='150px' /><Loader height='150px' /></>)}
        {posts.length > 0 && posts.map(post => (
            <Post {...post} key={post._id} />
        ))}
    </>
}