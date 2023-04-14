import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Content from './pages/Content';
import ContentUser from './pages/ContentUser';

import AdminUser from './pages/AdminUser';
import AdminTopic from './pages/AdminTopic';

import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/adminuser" element={<AdminUser />} />
        <Route path="/admintopic" element={<AdminTopic />} />

        <Route path="/" element={<Content />} />
        <Route path="/details" element={<ContentUser />} />

        <Route path="/*" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>

  )
}

export default App
