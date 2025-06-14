import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../context/UserContext";

function CreateListingPage({ onClose }) {
  const [item, setItem] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    postedTime: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setItem((prev) => ({
      ...prev,
      image: file,
    }));
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for file upload
    const formData = new FormData();
    formData.append('title', item.title);
    formData.append('description', item.description);
    formData.append('price', item.price);
    formData.append('location', item.location);
    formData.append('postedTime', new Date().toISOString());
    if (item.image) {
      formData.append('image', item.image);
    }

    // TODO: Replace with your API endpoint
    try {
      await fetch('/api/items', {
        method: 'POST',
        body: formData,
      });
      navigate('/marketplacepage');
    } catch (err) {
      alert('Failed to create listing.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-cream rounded-xl shadow-lg p-8 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-main_pink text-2xl"
        aria-label="Close"
        type="button"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-6 text-main_pink">Create a Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-main_pink text-white py-2 rounded-xl font-semibold hover:bg-pink-600 transition"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}

export default CreateListingPage;