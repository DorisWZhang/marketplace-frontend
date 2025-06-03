import React from 'react';

function ItemCard({ item }) {
  // `item` can have: image, title, price, description, etc.

  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden m-4 flex-shrink-0">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-main_pink">{item.title}</h3>
        <p className="text-gray-700 mt-1">{item.description}</p>
        <p className="mt-2 font-bold text-coral">${item.price}</p>
      </div>
    </div>
  );
}

export default ItemCard;
