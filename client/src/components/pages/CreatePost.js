import { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import { API_PORT } from '../../util/path';
import UserProgressContext from '../../store/UserProgressContext';
import { UserContext } from '../../store/user-context';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        [{'color':[]},{'background':[]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean'],
        ['code-block']
    ],
};
const formats = [
    'header',
    'color','background',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image','code-block'
];

export default function CreatePost() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const userId = userInfo?.id;
    const userProgressCtx = useContext(UserProgressContext);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
        console.log(files);
        userProgressCtx.showModal('Loading');
        const response = await fetch(`${API_PORT}post`, {
            method: 'POST',
            body: data,
            credentials: 'include'
        })
        userProgressCtx.hideModal();
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={`/user/${userId}`} />
    }
    return <form onSubmit={createNewPost}>
        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(ev) => { setTitle(ev.target.value) }}
            required
        />
        <input
            type="summary"
            placeholder="Summary"
            value={summary}
            onChange={(ev) => { setSummary(ev.target.value) }}
            required
        />
        <input
            type="file"
            onChange={(ev) => { setFiles(ev.target.files) }}
            required
        />
        <ReactQuill
            value={content}
            onChange={newValue => { setContent(newValue) }}
            modules={modules}
            formats={formats}
        />
        <button>Create Post</button>
    </form>
}