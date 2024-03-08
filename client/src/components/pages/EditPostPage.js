import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import { API_PORT } from "../../util/path";

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        [{ 'color': [] }, { 'background': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean'],
        ['code-block']
    ],
};
const formats = [
    'header',
    'color', 'background',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'code-block'
];

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`${API_PORT}post/${id}`).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            })
        })
        document.title = "Edit Post|Yash Blogs"
    }, [])

    async function editPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        ev.preventDefault();
        const response = await fetch(`${API_PORT}post`, {
            method: 'PUT',
            body: data,
            credentials: 'include'
        })
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }

    return <form onSubmit={editPost} className='p-8'>
        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(ev) => { setTitle(ev.target.value) }}
        />
        <input
            type="summary"
            placeholder="Summary"
            value={summary}
            onChange={(ev) => { setSummary(ev.target.value) }}
        />
        <input
            type="file"
            onChange={(ev) => { setFiles(ev.target.files) }}
        />
        <ReactQuill
            value={content}
            onChange={newValue => { setContent(newValue) }}
            modules={modules}
            formats={formats}
        />
        <button>Update Post</button>
    </form>
}