import React from 'react';
import { Link } from 'react-router-dom';

function AuthEntryPage() {
  return (
    <div className="flex flex-row justify-center items-center h-screen bg-cream">
      <div className="flex flex-row space-x-48 text-4xl text-main_pink">
        <Link to="/loginpage" className="cursor-pointer hover:text-coral transition-colors duration-200">
          login
        </Link>
        <Link to="/signuppage" className="cursor-pointer hover:text-coral transition-colors duration-200">
          sign up
        </Link>
      </div>
    </div>
  );
}

export default AuthEntryPage;
