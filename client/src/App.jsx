import { Routes,Route } from 'react-router-dom';
import Enter from './pages/Enter'; // Enter is same as Home page.
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Enter />} /> {/* Enter is same as Home page. */}
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<EmailVerify />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
      </Routes>
    </div>
  )
}

export default App