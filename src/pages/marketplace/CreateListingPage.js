import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../context/UserContext";
import GoogleMap from '../../components/GoogleMap';

function CreateListingPage({ onClose }) {
  const { user } = useUser();
  const [item, setItem] = useState({
    title: '',
    sellerID: user.id, 
    description: '',
    price: '',
    location: '',
    postedTime: '',
    views: 0,
    image: '',
    sold: false,
    latitude: user.latitude || null,
    longitude: user.longitude || null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Set default location to user's location on mount
  useEffect(() => {
    setItem(prev => ({
      ...prev,
      latitude: user.latitude || null,
      longitude: user.longitude || null,
    }));
  }, [user.latitude, user.longitude]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMapClick = ({ lat, lng }) => {
    setItem(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) {
    setImagePreview(null);
    setItem((prev) => ({ ...prev, image: '' }));
    return;
  }

  setImagePreview(URL.createObjectURL(file)); // temporary preview

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.secure_url) {
      setItem((prev) => ({
        ...prev,
        image: data.secure_url, // url to save in db
      }));
    } else {
      alert("Image upload failed..");
      console.error(data);
    }
  } catch (err) {
    alert("Image upload failed.");
    console.error("Cloudinary upload error:", err);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { postedTime, ...itemToSend } = item;
    try {
      const response = await fetch('http://localhost:8080/items/createitem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemToSend),
      });
      if (response.ok) {
        const createdItem = await response.json();
        console.log('Listing created:', createdItem);
        onClose();
      }
    } catch (err) {
      alert('Failed to create listing.');
      console.log(itemToSend);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-2 bg-cream rounded-xl shadow-lg p-4 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-main_pink text-2xl"
        aria-label="Close"
        type="button"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-2 text-main_pink">Create a Listing</h2>
      <form onSubmit={handleSubmit} className="flex flex-row gap-8">
        <div className="flex-1 space-y-2">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={item.title}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={item.description}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={item.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={item.location}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-main_pink text-white py-2 rounded-xl font-semibold hover:bg-pink-600 transition mt-4"
          >
            Create Listing
          </button>
        </div>
        {/* Right column: map and image */}
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium">Select Item Location on Map</label>
            <GoogleMap
              onLocationSelect={handleMapClick}
              latitude={item.latitude}
              longitude={item.longitude}
            />
            {item.latitude && item.longitude && (
              <div className="mt-2 text-sm text-gray-600">
                Selected: {item.latitude.toFixed(5)}, {item.longitude.toFixed(5)}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 h-32 object-cover rounded" />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateListingPage;