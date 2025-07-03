import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchSection({ setItems }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://marketplace-backend-production-7420.up.railway.app/items/getitembytitle/${searchQuery}`);
      if (response.ok) {
        const items = await response.json();
        setItems(items);
        console.log('Items fetched successfully:', items);
      } else {
        console.error('Failed to fetch items');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return (
    <div className='flex flex-row items-center justify-center'>
      <input
        type="text"
        placeholder="Search for items..."
        className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main_pink"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="ml-2 bg-main_pink text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition flex items-center justify-center"
        onClick={handleSearch}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
        Search
      </button>
    </div>
  );
}

export default SearchSection;