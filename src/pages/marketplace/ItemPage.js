import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegHeart } from '@fortawesome/free-regular-svg-icons';

function ItemPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState(location.state?.item || {});
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(location.state?.item || {});
  const [isFavourite, setIsFavourite] = useState(false);

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

  const handleFavourite = () => {
    if (user) {
      if (isFavourite) {
        try {
          const response = fetch(`http://localhost:8080/favourites/remove/${user.id}/${item.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId: item.id, userId: user.id }),
          });
          setIsFavourite(false);
          alert('Item removed from favourites.');
        } catch (error) {
          console.error('Error removing from favourites:', error);
          alert('An error occurred while removing the item from favourites. Please try again.');
        }
      } else {
        try {
          const response = fetch(`http://localhost:8080/favourites/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId: item.id, userId: user.id }),
          });
          setIsFavourite(true);
          alert('Item added to favourites.');
        } catch (error) {
          console.error('Error adding to favourites:', error);
          alert('An error occurred while adding the item to favourites. Please try again.');
        }
        
      }
    }
  }

  return (
    <div className="min-h-screen w-full bg-cream flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden m-8">
        <img
          src={item.image || ""}
          alt={item.title}
          className="w-full h-[32rem] object-cover"
        />
        <div className="p-10">
          <h1 className="text-3xl font-bold text-main_pink">{item.title}</h1>
          <p className="text-base text-gray-500 mt-2">Sold by: {item.sellerName}</p>
          <p className="text-2xl font-semibold text-coral mt-6">${item.price}</p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-700 text-base">{item.description}</p>
          </div>
          <div className="flex">
            <button
              onClick={() => navigate('/marketplacepage')}
              className="mt-8 bg-main_pink text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition text-lg"
            >
              Back
            </button>
            {user && user.id === item.sellerID && !isEditing && (
              <button
                className="mt-8 ml-8 bg-main_pink text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition text-lg"
                onClick={() => setIsEditing(true)}
              >
                Edit Listing
              </button>
            )}
            {user && user.id === item.sellerID && (
              <div
                className="mt-8 ml-8 bg-main_pink text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition cursor-pointer flex items-center justify-center"
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
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
            )}
            {/* Heart icon is always visible if user is logged in */}
            {user && (
              <div className="mt-8 ml-8 flex items-center">
                <FontAwesomeIcon
                  icon={isFavourite ? faHeart : faRegHeart}
                  className="text-main_pink text-2xl cursor-pointer"
                  onClick={() => setIsFavourite((prev) => !prev)}
                  title={isFavourite ? "Remove from favourites" : "Add to favourites"}
                />
              </div>
            )}
          </div>
          {isEditing && (
            <form onSubmit={handleEditSubmit} className="mt-10 space-y-6">
              <input
                type="text"
                name="title"
                value={editItem.title}
                onChange={handleEditChange}
                className="w-full border rounded px-4 py-3 text-lg"
              />
              <textarea
                name="description"
                value={editItem.description}
                onChange={handleEditChange}
                className="w-full border rounded px-4 py-3 text-lg"
              />
              <input
                type="number"
                name="price"
                value={editItem.price}
                onChange={handleEditChange}
                className="w-full border rounded px-4 py-3 text-lg"
              />
              <input
                type="text"
                name="location"
                value={editItem.location}
                onChange={handleEditChange}
                className="w-full border rounded px-4 py-3 text-lg"
              />
              <div className="flex space-x-6">
                <button
                  type="submit"
                  className="bg-main_pink text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition text-lg"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition text-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
