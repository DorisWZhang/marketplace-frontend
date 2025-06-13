import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

export default function ProfileInfoCard() {
  const { user } = useUser();

  const [cardState, setCardState] = useState('view');
  const [details, setDetails] = useState({ ...user });

  const genders = {
    "female":'Female',
    'male':'Male',
    'intersex':"Intersex",
    'other':'Other',
    'pnts': "Prefer not to say"
  }

  const universities = {
    'UBC' : 'University of British Columbia',
    'UofT': 'University of Toronto',
    'McGill': 'McGill University',
    'Waterloo': 'University of Waterloo',
    'Other': 'Other'

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  // only set details once User data is available (fix async user load)
  useEffect(() => {
    if (user) {
        setDetails({ ...user });
    }
    }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setDetails((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(details);

        if (!user.id) {
            console.error("User ID missing, cannot update user");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/users/updateuser/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(details),
            });

            if (response.ok) {
            const savedUser = await response.json();
            console.log('User updated:', savedUser);
            // Optionally update your app state here with savedUser
            } else {
            console.error('Failed to update user');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        console.log('Updated profile:', details);
        setCardState('view');
    };


  const handleCancel = () => {
    setDetails({ ...user });
    setCardState('view');
  };

  if (cardState === 'edit') {
    return (
      <div className="flex items-center justify-center bg-white p-6 w-full max-w-md rounded-xl shadow-md">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="text-center mb-4 relative">
            <label htmlFor="profilePicInput">
              <div className="w-24 h-24 mx-auto rounded-full border-2 border-dashed border-main_pink flex items-center justify-center cursor-pointer overflow-hidden bg-white hover:opacity-80 transition">
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

          <div className="space-y-4">
            <Input label="Name" name="name" value={details.name} onChange={handleChange} />
            <Input label="Age" name="age" value={details.age} onChange={handleChange} type="number" />

            <div>
              <label className="block text-sm text-gray-700">Gender</label>
              <select
                name="gender"
                value={details.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main_pink bg-white"
              >
                <option value="">Select your gender</option>
                <option value="female">{genders.female}</option>
                <option value="male">{genders.male}</option>
                <option value="intersex">{genders.intersex}</option>
                <option value="other">{genders.other}</option>
                <option value="prefer not to say">{genders.pnts}</option>
              </select>
            </div>

            <Input label="Location" name="location" value={details.location} onChange={handleChange} />

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
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-main_pink text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // VIEW MODE
  return (
    <div className="relative flex flex-col items-center mb-10 bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      <button
        onClick={() => setCardState('edit')}
        className="absolute top-4 right-4 text-sm bg-main_pink text-white px-4 py-1 rounded-full hover:bg-pink-600 transition"
      >
        Edit
      </button>

      <img
        src={user.profilePic}
        alt="Profile pic"
        className="w-28 h-28 rounded-full border-4 border-main_pink object-cover mb-4"
      />
      <div className="space-y-2 text-center text-gray-800">
        <p><span className="font-medium text-main_pink">Name:</span> {user.name}</p>
        <p><span className="font-medium text-main_pink">Email:</span> {user.email}</p>
        <p><span className="font-medium text-main_pink">Gender:</span> {user.gender}</p>
        <p><span className="font-medium text-main_pink">Age:</span> {user.age}</p>
        <p><span className="font-medium text-main_pink">University:</span> {user.university}</p>
        <p><span className="font-medium text-main_pink">Location:</span> {user.location}</p>
      </div>
    </div>
  );
}

// Reusable input component
function Input({ label, name, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main_pink"
      />
    </div>
  );
}
