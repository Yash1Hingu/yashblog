import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('https://yashblogapi.onrender.com/post',
            {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": "https://yashblogapi.onrender.com"
                }
            }
        ).then(response => {
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