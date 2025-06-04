import React from 'react';
import Logo from '../../assets/photos/CampusCart.png';
import BottomTab from '../../components/BottomTab';

function ProfilePage() {
  const user = {
    name: 'Doris Zhang',
    location: 'UBC',
    profilePic: 'https://via.placeholder.com/150x150.png?text=Profile+Pic',
    postings: [
      { id: 1, title: 'Vintage Lamp' },
      { id: 2, title: 'Used Bicycle' },
    ],
    purchases: [
      { id: 1, title: 'Desk Chair' },
      { id: 2, title: 'Bluetooth Headphones' },
    ],
  };

  const Section = ({ title, items }) => (
    <section className="mb-10 w-full max-w-5xl">
      <h2 className="text-2xl text-main_pink mb-4 font-light">{title}</h2>
      <ul className="space-y-2">
        {items.length ? (
          items.map((item) => (
            <li key={item.id} className="bg-white p-4 rounded-xl shadow-md text-gray-800">
              {item.title}
            </li>
          ))
        ) : (
          <p className="text-sm italic text-gray-500">No items found.</p>
        )}
      </ul>
    </section>
  );

  return (
    <div className="flex flex-col min-h-screen bg-cream transition-opacity duration-1000">
      <div className="flex-grow flex flex-col items-center py-10 px-4">
        <img src={Logo} alt="Campus Cart Logo" className="w-24 mb-2" />
        <h1 className="text-5xl mb-6 text-main_pink font-light">your profile</h1>

        <div className="flex flex-col items-center mb-10">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-main_pink object-cover mb-4"
          />
          <h2 className="text-2xl text-main_pink font-medium">{user.name}</h2>
          <p className="text-gray-600">{user.location}</p>
        </div>

        <Section title="Your Postings" items={user.postings} />
        <Section title="Items Bought" items={user.purchases} />
      </div>

      <BottomTab />
    </div>
  );
}

export default ProfilePage;
