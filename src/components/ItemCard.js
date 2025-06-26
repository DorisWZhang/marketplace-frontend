import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ItemCard({ item }) {
  const navigate = useNavigate();
  const [sellerName, setSellerName] = useState('');

  useEffect(() => {
    async function fetchSeller() {
      try {
        const response = await fetch(`http://localhost:8080/users/getuserbyid/${item.sellerID}`);
        if (response.ok) {
          const user = await response.json();
          setSellerName(user.name);

          // Add sellerName to the item object
          item.sellerName = user.name;
        } else {
          setSellerName('Unknown');
          item.sellerName = 'Unknown';
        }
      } catch {
        setSellerName('Unknown');
        item.sellerName = 'Unknown';
      }
    }
    if (item.sellerID) fetchSeller();
  }, [item]);

  const handleClick = () => {
    navigate(`/itempage/${item.id}`, { state: { item } });
  };


  return (
    <button onClick={handleClick} className="w-full text-left">
      <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden m-4 flex-shrink-0 w-60">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-main_pink">{item.title}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
          <p className="text-gray-500 text-xs mt-1">
            Sold by: {sellerName || 'Unknown'}
          </p>
          <p className="mt-2 font-bold text-coral">${item.price}</p>
        </div>
      </div>
    </button>
  );
}

export default ItemCard;
