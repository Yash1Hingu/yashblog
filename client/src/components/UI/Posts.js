import Post from "../Post";

export default function Posts({ posts }) {
    return <>
        <div>
            <div className="flex justify-evenly gap-8 flex-wrap">
                {posts.map(post => (
                    <Post {...post} key={post._id} />
                ))}
            </div>
        </div>
    </>
}