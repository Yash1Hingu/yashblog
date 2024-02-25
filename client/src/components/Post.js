import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { API_PORT } from '../util/path';
export default function Post({ title, summary, content, createdAt, cover, author, _id }) {
    // return (
    //     <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mb-8">
    //         <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
    //             <Link to={'/post/' + _id}>
    //                 <img src={cover} alt="" />
    //             </Link>
    //         </div>
    //         <div className="p-6">
    //             <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
    //                 <Link to={'/post/' + _id}>
    //                     <h2>{title}</h2>
    //                 </Link>
    //             </h5>
    //             <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
    //                 <Link to={`/user/${author._id}`} className="author">{author.userName}</Link> <br />
    //                 <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
    //             </p>
    //         </div>
    //         <div className="p-6 pt-0">
    //             <Link to={'/post/' + _id} data-ripple-light="true" type="button" className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
    //                 Read More
    //             </Link>
    //         </div>
    //     </div>
    // )
    return (
        <Link to={'/post/' + _id} className="card">
            <div className="main-content">
                <div className="header">
                    <img src={cover} alt="post-image" className='mb-4 aspect-video rounded-lg'/>
                    <span>Article on</span>
                    <span className='font-bold'>  {format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</span>
                </div>
                <p className="heading">{title}</p>
            </div>
            <div className="footer">
                by <Link to={`/user/${author._id}`} className="author underline">{author.userName}</Link>
            </div>
        </Link>
    )
}