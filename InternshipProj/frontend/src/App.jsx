import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Admin from './components/Admin';

function App() {
  return (
    // React Fragments ;ใช้แทน div ได้
    <>
      <Router>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
