import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            })
        })
    }, [])  

    if(!postInfo) return '';
    return <div className="post-page">
        <h1>{postInfo.title}</h1>
        <p className="author">by {postInfo.author['userName']}</p>
        <time>{new Date(postInfo.createdAt).toUTCString()}</time>
        <div className="image">
            <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
        </div>
        <div dangerouslySetInnerHTML={{__html:postInfo.content}} className="content"/>
    </div>
}