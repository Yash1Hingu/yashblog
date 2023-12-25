import { format } from 'date-fns';
export default function Post({ title, summary, content, createdAt, cover ,author}) {
    return <div className="post">
        <div className="image">
            <img src="https://images.unsplash.com/photo-1517329782449-810562a4ec2f?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
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