import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Post from './components/Post';
import './App.css';
import Layout from './components/Layout';
import IndexPage from './components/pages/IndexPage';

function App() {
  return <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<IndexPage>} />
      <Route path='/login' element={<h1>Login</h1>} />
      <Route path='/register' element={<h1>Register</h1>} />
    </Route >
  </Routes>
}

export default App;
