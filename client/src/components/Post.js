import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { API_PORT } from '../util/path';
export default function Post({ title, summary, content, createdAt, cover, author , _id}) {
    const shortSummary = summary.length > 100 ? summary.slice(0, 100) + "..." : summary;
    return <div className="post">
        <div className="image">
            <Link to={'/post/'+_id}>
                <img src={cover} alt="" />
            </Link>
        </div>
        <div className="texts">
            <Link to={'/post/'+_id}> 
                <h2>{title}</h2>
            </Link>
            <p className="info">
                <a href="" className="author">{author.userName}</a>
                <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
            </p>
            <p className='summary'>{shortSummary}</p>
        </div>
    </div>
}