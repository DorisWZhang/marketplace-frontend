import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User } from 'lucide-react'; // Optional: use any icon set

function BottomTab() {
  const location = useLocation();

  const tabStyle = (path) =>
    `flex flex-col items-center justify-center w-1/2 py-2 ${
      location.pathname === path ? 'text-main_pink font-semibold' : 'text-gray-500'
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex z-50">
      <Link to="/marketplacepage" className={tabStyle('/marketplacepage')}>
        <Home size={20} className="mb-1" />
        <span className="text-sm">Marketplace</span>
      </Link>
      <Link to="/profilepage" className={tabStyle('/profilepage')}>
        <User size={20} className="mb-1" />
        <span className="text-sm">Profile</span>
      </Link>
    </div>
  );
}

export default BottomTab;
