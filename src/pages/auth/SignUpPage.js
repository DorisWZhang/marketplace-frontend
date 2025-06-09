import React from 'react';
import { Link, useNavigate} from 'react-router-dom';

function SignUpPage() {
  const navigate = useNavigate();
  
  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/userdetailspage');
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-cream">
      <div className="bg-cream p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-main_pink mb-2 text-center">
          Create Your Account
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Only university-issued email addresses are eligible for registration.
        </p>
        
        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main_pink"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">University Email</label>
            <input
              type="email"
              placeholder="Enter your university email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main_pink"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main_pink"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-coral text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/loginpage" className="text-main_pink font-semibold cursor-pointer">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
