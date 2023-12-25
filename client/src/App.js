import { Route, Routes } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import IndexPage from './components/pages/IndexPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import { UserContextProvider } from './store/user-context';

function App() {
  return <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route >
    </Routes>
  </UserContextProvider>
}

export default App;
