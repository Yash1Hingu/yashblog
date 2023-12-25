import { format } from 'date-fns';
export default function Post({ title, summary, content, createdAt, cover ,author}) {
    return <div className="post">
        <div className="image">
            <img src={'http://localhost:4000/'+cover} alt="" />
        </div>
        <div className="texts">
            <h2>{title}</h2>
            <p className="info">
                <a href="" className="author">{author.userName}</a>
                <time>{format(new Date(createdAt),'MMM d, yyyy HH:mm')}</time>
            </p>
            <p className='summary'>{summary}</p>
        </div>
    </div>
}