import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/photos/CampusCart.png"; // Adjust the path if needed

function AuthEntryPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cream transition-opacity duration-1000">
      <img src={Logo} alt="Campus Cart Logo" className="w-32 mb-4" />

      <h1 className="text-5xl mb-10 text-main_pink font-light">campus cart</h1>

      <div className="flex space-x-20 text-3xl">
        <Link
          to="/loginpage"
          className="text-main_pink hover:text-coral transition-colors duration-200"
        >
          login
        </Link>
        <Link
          to="/signuppage"
          className="text-main_pink hover:text-coral transition-colors duration-200"
        >
          sign up
        </Link>
      </div>
    </div>
  );
}

export default AuthEntryPage;
