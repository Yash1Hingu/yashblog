import { Route, Routes } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import IndexPage from './components/pages/IndexPage';
import LoginPage from './components/pages/LoginPage';

function App() {
  return <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<IndexPage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<h1>Register</h1>} />
    </Route >
  </Routes>
}

export default App;
