import { useEffect, useState } from "react";
import Post from "../Post";
import { API_PORT } from "../../util/path";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch(`${API_PORT}post`).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            })
        })
    }, [])
    return <>
        {posts.length > 0 && posts.map(post => (
            <Post {...post} key={post._id} />
        ))}
    </>
}