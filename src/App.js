import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // adjust path if needed
import TransitionPage from './pages/TransitionPage'; // adjust path if needed
import AuthEntryPage from './pages/AuthEntryPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/transitionpage" element={<TransitionPage />} />
        <Route path="/authentrypage" element={<AuthEntryPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/authentrypage" element={<AuthEntryPage />} />
        <Route path='/signuppage' element={<SignUpPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
