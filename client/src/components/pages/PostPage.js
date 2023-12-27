import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../store/user-context";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    //userInfo : who are logged In
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            })
        })
    }, [])

    if (!postInfo) return '';
    return <div className="post-page">
        <h1>{postInfo.title}</h1>
        <p className="author">by {postInfo.author['userName']}</p>
        <time>{new Date(postInfo.createdAt).toUTCString()}</time>
        {userInfo.id === postInfo.author['_id'] && (
            <div className="edit_container">
                <a href="" className="edit_btn">Edit This Post</a>
            </div>
        )}
        <div className="image">
            <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} className="content" />
    </div>
}