import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // adjust path if needed
import TransitionPage from './pages/TransitionPage'; // adjust path if needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/transitionpage" element={<TransitionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
