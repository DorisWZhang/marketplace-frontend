import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchSection() {
  return (
    <div className='flex flex-row h-screen bg-cream items-center justify-center'>
      <input
        type="text"
        placeholder="Search for items..."
        className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main_pink"
      />
      <button
        type="submit"
        className="ml-2 bg-main_pink text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
        Search
      </button>
    </div>
  );
}

export default SearchSection;