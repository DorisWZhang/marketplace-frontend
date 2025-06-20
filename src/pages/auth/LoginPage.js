import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from "../../context/UserContext"

function LoginPage() {

  const navigate = useNavigate();

  const { login } = useUser();

  const [formData, setFormData] = useState({
      email: '',
      password: ''
    });

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      });
      if (response.ok) {
        const fetchedUser = await response.json();
        console.log('Logged in:', fetchedUser);
        login(fetchedUser);
        navigate('/marketplacepage');
      } else {
        console.error('Failed to login');
        const errorMessage = await response.text();
        alert(errorMessage); 
      }
    } catch (error) {
            console.error('Error:', error);

    navigate('/marketplacepage')
  }
}

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cream">
      <div className="bg-cream p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-main_pink mb-6 text-center">Login to Your Account</h2>
        
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              name='email'
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main_pink"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              name='password'
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main_pink"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-coral text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
          href="/marketplacepage">
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account? <Link to='/signuppage' className="text-main_pink font-semibold cursor-pointer">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
