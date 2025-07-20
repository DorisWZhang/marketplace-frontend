import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegHeart } from '@fortawesome/free-regular-svg-icons';
import { BsChatDots } from "react-icons/bs";
import GoogleMap from '../../components/GoogleMap';
import ConversationPage from '../../components/ConversationPage';
import Modal from '../../components/Modal';

function ItemPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState(location.state?.item || {});
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(location.state?.item || {});
  const [isFavourite, setIsFavourite] = useState(false);
  const [sellerName, setSellerName] = useState('');
  const [showConversation, setShowConversation] = useState(false);
  const [imagePreview, setImagePreview] = useState(editItem.image || '');


  // check if item is already favourited
  useEffect(() => {
    const checkFavourite = async () => {
      if (user && item.id) {
        try {
          const response = await fetch(`https://marketplace-backend-production-7420.up.railway.app/favourites/check/${user.id}/${item.id}`);
          if (response.ok) {
            const isFav = await response.json(); // expecting a boolean true/false
            setIsFavourite(isFav);
          } else {
            setIsFavourite(false);
          }
        } catch (error) {
          console.error('Error checking favourites:', error);
        }
      }
    };


    checkFavourite();

    
  }, [user, item.id]);

  useEffect(() => {
    async function fetchSeller() {
      if (item.sellerID) {
        try {
          const response = await fetch(`https://marketplace-backend-production-7420.up.railway.app/users/getuserbyid/${item.sellerID}`);
          if (response.ok) {
            const user = await response.json();
            setSellerName(user.name);
          } else {
            setSellerName('Unknown');
          }
        } catch {
          setSellerName('Unknown');
        }
      }
    }
    fetchSeller();
  }, [item.sellerID]);


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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));

    // upload to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );
      const data = await res.json();
      if (data.secure_url) {
        setEditItem(prev => ({ ...prev, image: data.secure_url }));
      } else {
        alert("Image upload failed.");
      }
    } catch (err) {
      alert("Image upload failed.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://marketplace-backend-production-7420.up.railway.app/items/updateitem/${editItem.id}`, {
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

  const handleFavourite = async () => {
    if (user) {
      if (isFavourite) {
        try {
          const response = await fetch(`https://marketplace-backend-production-7420.up.railway.app/favourites/${user.id}/${item.id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            setIsFavourite(false);
            alert('Item removed from favourites.');
          } else {
            console.log('Failed to remove item from favourites:', response.statusText);
          }
        } catch (error) {
          console.error('Error removing from favourites:', error);
          alert('An error occurred while removing the item from favourites. Please try again.');
        }
      } else {
        try {
          const response = await fetch(`https://marketplace-backend-production-7420.up.railway.app/favourites`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId: item.id, userId: user.id }),
          });
          if (response.ok) {
            setIsFavourite(true);
            alert('Item added to favourites.');
          } else {
            alert('Failed to add item to favourites. Please try again.');
          }
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
          <p className="text-base text-gray-500 mt-2">Sold by: {sellerName || 'Unknown'}</p>
          <p className="text-2xl font-semibold text-coral mt-6">${item.price}</p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-700 text-base">{item.description}</p>
          </div>
          {item.latitude && item.longitude && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Item Location</h2>
              <GoogleMap
                latitude={item.latitude}
                longitude={item.longitude}
                readOnly={true}
                onLocationSelect={() => {}}
              />
              <div className="mt-2 text-sm text-gray-600">
                {item.latitude.toFixed(5)}, {item.longitude.toFixed(5)}
              </div>
            </div>
          )}
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
                  if (window.confirm('Are you sure you want to delete this listing?')) {
                    try {
                      const response = await fetch(`https://marketplace-backend-production-7420.up.railway.app/items/deleteitem/${item.id}`, {
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
            {user && (
              <div className="mt-8 ml-8 flex items-center">
                <FontAwesomeIcon
                  icon={isFavourite ? faHeart : faRegHeart}
                  className="text-main_pink text-2xl cursor-pointer"
                  onClick={() => handleFavourite()}
                  title={isFavourite ? "Remove from favourites" : "Add to favourites"}
                />
                <BsChatDots
                  className="text-main_pink text-2xl cursor-pointer ml-12"
                  title="Message Seller"
                  onClick={() => {
                    if (user.id !== item.sellerID) {
                      setShowConversation(true);
                    }
                  }}
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
              
              <div>
                <label className="block mb-1 font-medium">Edit Item Location on Map</label>
                <GoogleMap
                  latitude={editItem.latitude}
                  longitude={editItem.longitude}
                  onLocationSelect={({ lat, lng }) =>
                    setEditItem(prev => ({
                      ...prev,
                      latitude: lat,
                      longitude: lng,
                    }))
                  }
                />
                {editItem.latitude && editItem.longitude && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected: {editItem.latitude.toFixed(5)}, {editItem.longitude.toFixed(5)}
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 h-32 object-cover rounded" />
              )}
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
          {showConversation && (
            <Modal onClose={() => setShowConversation(false)}>
              <ConversationPage otherUserId={item.sellerID} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
