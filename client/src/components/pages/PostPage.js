import { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { UserContext } from "../../store/user-context";
import { API_PORT } from "../../util/path";

import whatsappIcon from '../../images/whatsapp-icon.svg'
import linkedin from '../../images/linkedin.svg'
import twitter from '../../images/twitter.svg'

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    //userInfo : who are logged In
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    useEffect(() => {
        fetch(`${API_PORT}post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            })
        })
    }, [])
    const userID = userInfo?.id;
    if (!postInfo) return '';
    return <div className="post-page">
        <h1>{postInfo.title}</h1>
        <p className="author">by {postInfo.author['userName']}</p>
        <time>{new Date(postInfo.createdAt).toUTCString()}</time>
        {userID === postInfo.author['_id'] && (
            <div className="edit_container">
                <Link to={`/edit/${postInfo._id}`} className="edit_btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                    Edit This Post</Link>
            </div>
        )}
        <div className="image">
            <img src={`${postInfo.cover}`} alt="" />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} className="content" />

        <div className="share_post_link">
            <a href={`whatsapp://send?text=${API_PORT}#/post/${postInfo._id}`} data-action="share/whatsapp/share"><img src={whatsappIcon} alt="" /></a>

            <a href={`https://twitter.com/intent/tweet?url=${API_PORT}#/post/${postInfo._id}&text=Check%20out%20this%20awesome%20post!`} target="_blank"><img src={twitter} alt="twitter" /></a>

            <a href={`https://www.linkedin.com/shareArticle?url=${API_PORT}#/post/${postInfo._id}&title=Awesome%20Post`} target="_blank"><img src={linkedin} alt="linkedin" /></a>
        </div>
    </div>
}  