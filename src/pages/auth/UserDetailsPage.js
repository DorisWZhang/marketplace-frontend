import React, { lazy, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from "../../context/UserContext";
import GoogleMap from '../../components/GoogleMap';

function UserDetailsPage() {
    
    const navigate = useNavigate();

    const location = useLocation();

    const { login } = useUser();


    const { name, email, password } = location.state || {};

    const [details, setDetails] = useState({
        name: '',
        gender: '',
        age: '',
        location: '',
        university: '',
        profilePic: null,
        longitude: null,
        latitude: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDetails((prev) => ({
            ...prev,
            profilePic: URL.createObjectURL(file), // for preview only
        }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userPayload = {
            ...details,
            email,
            password,
        };

        //console.log(userPayload); // For now
        console.log(JSON.stringify(userPayload));
        try {

            const response = await fetch('http://localhost:8080/users/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userPayload),
            });

            if (response.ok) {
            const savedUser = await response.json();
            console.log('User created:', savedUser);
            login(savedUser);
            navigate('/marketplacepage');
            } else {
            console.error('Failed to create user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
  };

  const handleMapClick = ({ lat, lng }) => {
    setDetails((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };




    
    return (
    <div className="flex items-center justify-center min-h-screen bg-cream">
      <div className="bg-cream p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-main_pink mb-2 text-center">
          Complete Your Profile
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="text-center">
        
        <div className="relative w-24 h-24 mx-auto mb-2">
            <label htmlFor="profilePicInput">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-main_pink flex items-center justify-center cursor-pointer overflow-hidden bg-white hover:opacity-80 transition">
                {details.profilePic ? (
                <img
                    src={details.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                />
                ) : (
                <span className="text-sm text-gray-400">Add Photo</span>
                )}
            </div>
            </label>
            <input
            id="profilePicInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            />
        </div>
        </div>

          <div>
            <label className="block text-sm text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main_pink"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={details.age}
              onChange={handleChange}
              placeholder="Enter your age"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main_pink"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Gender</label>
            <select
              name="gender"
              value={details.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main_pink bg-white"
            >
              <option value="">Select your gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="intersex">Intersex</option>
              <option value="other">Other</option>
              <option value="prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700">University</label>
            <select
              name="university"
              value={details.university}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main_pink bg-white"
            >
              <option value="">Select your university</option>
              <option value="UBC">University of British Columbia</option>
              <option value="UofT">University of Toronto</option>
              <option value="McGill">McGill University</option>
              <option value="Waterloo">University of Waterloo</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={details.location}
              onChange={handleChange}
              placeholder="Enter your location"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main_pink"
            />
          </div>
            <GoogleMap onLocationSelect={handleMapClick}/>
            {details.latitude && details.longitude && (
              <div className="mt-2 text-sm text-gray-600">
                Selected: {details.latitude.toFixed(5)}, {details.longitude.toFixed(5)}
              </div>
            )}

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-coral text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserDetailsPage