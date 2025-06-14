import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ItemPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state || {};

  if (!item) {
    return (
      <div className="text-center mt-20 text-red-500">
        <p>Item data not found.</p>
        <button
          onClick={() => navigate('/marketplacepage')}
          className="mt-4 bg-main_pink text-white px-4 py-2 rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-cream rounded-2xl shadow-md overflow-hidden m-4">
      <img
        src={item.image || ""}
        alt={item.title}
        className="w-full h-72 object-cover"
      />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-main_pink">{item.title}</h1>
        <p className="text-sm text-gray-500 mt-1">Sold by: {item.sellerName}</p>
        <p className="text-lg font-semibold text-coral mt-4">${item.price}</p>

        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Description</h2>
          <p className="text-gray-700 text-sm">{item.description}</p>
        </div>

        <button
          onClick={() => navigate('/marketplacepage')}
          className="mt-6 bg-main_pink text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ItemPage;
