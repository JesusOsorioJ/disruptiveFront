import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Content from './pages/Content';

import AdminUser from './pages/AdminUser';
import AdminTopic from './pages/AdminTopic';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ErrorPage from './pages/ErrorPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="" element={<Content />} />
        <Route path="/home/:page?" element={<Content />} />
        <Route path="/adminuser" element={<AdminUser />} />
        <Route path="/admintopic" element={<AdminTopic />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
    </Router>

  )
}

export default App
