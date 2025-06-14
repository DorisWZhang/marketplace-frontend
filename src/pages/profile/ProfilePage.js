import React from 'react';
import Logo from '../../assets/photos/CampusCart.png';
import BottomTab from '../../components/BottomTab';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ProfileInfoCard from '../../components/ProfileInfoCard';
import PostingSection from '../../components/PostingSection';
import { Section } from 'lucide-react';

// Example mock data for user postings
const postings_mock_data = [
  {
    id: 1,
    title: 'Vintage Lamp',
    description: 'A beautiful vintage lamp in great condition.',
    price: 25,
    location: 'UBC',
    image: 'https://via.placeholder.com/200x200.png?text=Lamp',
    sellerName: 'Doris Zhang',
    views: 12,
  },
  {
    id: 2,
    title: 'Used Bicycle',
    description: 'A reliable used bicycle, perfect for campus.',
    price: 100,
    location: 'UBC',
    image: 'https://via.placeholder.com/200x200.png?text=Bicycle',
    sellerName: 'Doris Zhang',
    views: 34,
  },
  {
    id: 3,
    title: 'Desk Chair',
    description: 'Comfortable desk chair, lightly used.',
    price: 40,
    location: 'UBC',
    image: 'https://via.placeholder.com/200x200.png?text=Chair',
    sellerName: 'Doris Zhang',
    views: 20,
  },
];

function ProfilePage() {
  
    const { user }= useUser();
    const navigate = useNavigate();
/*  const Section = ({ title, items }) => (
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

  */
  return (
    <div className="flex flex-col min-h-screen bg-cream transition-opacity duration-1000">
      <div className="flex-grow flex flex-col items-center py-10 px-4">
        <img src={Logo} alt="Campus Cart Logo" className="w-24 mb-2" />
        <h1 className="text-5xl mb-6 text-main_pink font-light">your profile</h1>
        <ProfileInfoCard/>
        <PostingSection title="Your Postings" items={postings_mock_data} />
      </div>

      <BottomTab />
    </div>
  );
}

export default ProfilePage;
