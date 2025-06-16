import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function ItemPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState(location.state?.item || {});
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(location.state?.item || {});

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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/items/updateitem/${editItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editItem),
      });
      if (response.ok) {
        const updatedItem = await response.json();
        setEditItem(updatedItem);
        setItem(updatedItem); // <-- update the main item state
        setIsEditing(false);
      } else {
        alert('Failed to update item. Please try again.');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('An error occurred while updating the item. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden m-4">
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
        <div className="flex">
          <button
            onClick={() => navigate('/marketplacepage')}
            className="mt-6 bg-main_pink text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition"
          >
            Back
          </button>
          {user && user.id === item.sellerID && !isEditing && (
            <button
              className="mt-6 ml-8 bg-main_pink text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition"
              onClick={() => setIsEditing(true)}
            >
              Edit Listing
            </button>
          )}
          {user && user.id === item.sellerID && (
            <div
              className="mt-6 ml-8 bg-main_pink text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition cursor-pointer flex items-center justify-center"
              title="Delete Listing"  
              onClick={async () => {
                  if (window.confirm('Are you sure you want to delete this item?')) {
                    try {
                      const response = await fetch(`http://localhost:8080/items/deleteitem/${item.id}`, {
                        method: 'DELETE',
                      });
                      if (response.ok) {
                        navigate('/marketplacepage');
                      } else {
                        alert('Failed to delete item. Please try again.');
                      }
                    } catch (error) {
                      console.error('Error deleting item:', error);
                      alert('An error occurred while deleting the item. Please try again.');
                    }
                  }
                }}
            >
              <FontAwesomeIcon
                icon={faTrashCan}
              />
            </div>
          )}
        </div>
        {isEditing && (
          <form onSubmit={handleEditSubmit} className="mt-8 space-y-4">
            <input
              type="text"
              name="title"
              value={editItem.title}
              onChange={handleEditChange}
              className="w-full border rounded px-3 py-2"
            />
            <textarea
              name="description"
              value={editItem.description}
              onChange={handleEditChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="number"
              name="price"
              value={editItem.price}
              onChange={handleEditChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="location"
              value={editItem.location}
              onChange={handleEditChange}
              className="w-full border rounded px-3 py-2"
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-main_pink text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ItemPage;
