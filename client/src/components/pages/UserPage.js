import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { API_PORT } from "../../util/path";
import Loader from "../UI/Loader";
import Post from "../Post";

export default function UserPage() {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [userposts, setuserPosts] = useState([]);
    useEffect(() => {
        fetch(`${API_PORT}user/${id}`).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                document.title = `${userInfo.userName} | Yash Blogs`;
            })
        })
        fetch(`${API_PORT}userposts/${id}`).then(response => {
            response.json().then(posts => {
                setuserPosts(posts);
            })
        })

    }, [])

    if (!userInfo) return <><Loader height='150px' width='150px'/><Loader height='150px' /><Loader height='150px' /><Loader height='150px' /></>

    return <div className="userprofile_container">
        <div className="profile_header">
            <div className="profile_wrapper">
                <img src={userInfo.profile} alt="user profile." />
            </div>
            <p>{userInfo.userName}</p>
        </div>
        <div className="user_posts">
            {userposts.length === 0 && (<><Loader height='150px' /><Loader height='150px' /><Loader height='150px' /><Loader height='150px' /></>)}
            {userposts.length > 0 && userposts.map(post => (
                <Post {...post} key={post._id} />
            ))}
        </div>
    </div>
}