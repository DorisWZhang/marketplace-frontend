import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../context/UserContext";

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
    
  });

  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) {
    setImagePreview(null);
    setItem((prev) => ({ ...prev, image: null }));
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    setItem((prev) => ({
      ...prev,
      image: reader.result, // Base64 string
    }));
    setImagePreview(reader.result);
  };
  reader.readAsDataURL(file); // convert to base64
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Don't include postedTime — backend will set it
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