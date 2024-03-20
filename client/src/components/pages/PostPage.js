import { useState, useEffect, useContext } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { UserContext } from "../../store/user-context";
import { API_PORT, CLIENT_URL, SHARE_URL } from "../../util/path";
import MarkdownEditor from '@uiw/react-markdown-editor';

import whatsappIcon from '../../images/whatsapp-icon.svg'
import linkedin from '../../images/linkedin.svg'
import twitter from '../../images/twitter.svg'

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    //userInfo : who are logged In
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    const [redirect, setRedirect] = useState(false);
    const userID = userInfo?.id;

    useEffect(() => {
        fetch(`${API_PORT}post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
                document.title = postInfo.title;
            })
        })
    }, [])

    async function handleDelete() {
        const response = await fetch(`${API_PORT}delete/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        if (response.ok) {
            response.json().then(msg => console.log(msg))
            setRedirect(true);
        }
    }

    if (!postInfo) return '';
    if (redirect) {
        return <Navigate to={'/user/' + userID} />
    }

    return <div className="post-page p-4">
        <h1 className="text-4xl font-bold">{postInfo.title}</h1>
        <Link
            to={`/user/${postInfo.author['_id']}`}
            className="author"
        >by {postInfo.author['userName']}
        </Link>
        <time>{new Date(postInfo.createdAt).toUTCString()}</time>
        {userID === postInfo.author['_id'] && (
            <div className="edit_container">
                <Link to={`/edit/${postInfo._id}`} className="edit_btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                    Edit This Post</Link>
                <button className="cancel_btn" onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24"><path fill="#fa0055" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" /></svg>
                    Delete this post</button>
            </div>
        )}
        <div className="image">
            <img src={`${postInfo.cover}`} alt="" className="aspect-video rounded-3xl" />
        </div>

        <MarkdownEditor.Markdown source={postInfo.content} height="200px" />

        <div className="share_post_link">
            <a href={`whatsapp://send?text=Check%20out%20this%20awesome%20post!${SHARE_URL}${postInfo._id}`} data-action="share/whatsapp/share"><img src={whatsappIcon} alt="" /></a>

            <a href={`https://twitter.com/intent/tweet?url=${SHARE_URL}${postInfo._id}&text=Check%20out%20this%20awesome%20post!`} target="_blank"><img src={twitter} alt="twitter" /></a>

            <a href={`https://www.linkedin.com/shareArticle?url=${SHARE_URL}${postInfo._id}&title=Awesome%20Post`} target="_blank"><img src={linkedin} alt="linkedin" /></a>
        </div>
    </div>
}  