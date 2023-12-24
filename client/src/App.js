import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Post from './components/Post';
import './App.css';

function App() {
  return <Routes>
    <Route index element={
      <main>
        <Header />
        <Post />
        <Post />
        <Post />
      </main>
    } />
    <Route path='/login' element={
      <h1>Login</h1>
    }/>
  </Routes>
}

export default App;
