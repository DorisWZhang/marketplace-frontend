import React from 'react';
import ItemCard from './ItemCard';

function PostingSection({ title, items }) {
  return (
    <section className="mb-10 w-full max-w-5xl">
      <h2 className="text-2xl text-main_pink mb-4 font-light">{title}</h2>
      <div className="flex overflow-x-auto space-x-4">
        {items.length ? (
          items.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <p className="text-gray-600 text-sm italic">No items available.</p>
        )}
      </div>
    </section>
  );
}

export default PostingSection;