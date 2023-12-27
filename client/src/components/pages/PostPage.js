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
                <a href="" className="edit_btn">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" fill="#fff">
                        <path d="M46.6,3.4c-1-1-2.2-1.4-3.4-1.4c-1.2,0-2.5,0.5-3.4,1.4c0,0-0.1,0.1-0.2,0.2c0,0,0,0,0,0L4.3,38.8c-0.1,0.1-0.2,0.3-0.3,0.4	l-2,7.5c-0.1,0.3,0,0.7,0.3,1C2.5,47.9,2.7,48,3,48c0.1,0,0.2,0,0.3,0l7.5-2c0.2,0,0.3-0.1,0.4-0.3l35.2-35.2c0,0,0,0,0,0	c0.1-0.1,0.2-0.2,0.2-0.2C48.5,8.4,48.5,5.3,46.6,3.4z M45.2,4.8c1.1,1.1,1.1,2.9,0,4.1c-0.3,0.3-0.6,0.6-0.9,0.9l-4.1-4.1	c0.5-0.5,0.9-0.9,0.9-0.9c0.5-0.5,1.3-0.8,2-0.8C43.9,4,44.6,4.3,45.2,4.8z M5.6,41.2l3.2,3.2l-4.4,1.2L5.6,41.2z"></path>
                    </svg>
                    Edit This Post</a>
            </div>
        )}
        <div className="image">
            <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} className="content" />
    </div>
}