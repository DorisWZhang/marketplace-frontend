import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/auth/LandingPage'; // adjust path if needed
import TransitionPage from './pages/auth/TransitionPage'; // adjust path if needed
import AuthEntryPage from './pages/auth/AuthEntryPage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import MarketplacePage from './pages/marketplace/MarketplacePage';
import ProfilePage from './pages/profile/ProfilePage';
import UserDetailsPage from './pages/auth/UserDetailsPage';
import ItemPage from './pages/marketplace/ItemPage';
import CreateListingPage from './pages/marketplace/CreateListingPage';

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
        <Route path='/marketplacepage' element={<MarketplacePage/>} />
        <Route path='/profilepage' element={<ProfilePage/>} />
        <Route path='/userdetailspage' element={<UserDetailsPage/>} />
        <Route path='/itempage/:itemId' element={<ItemPage/>} />
        <Route path='/createlistingpage' element={<CreateListingPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
