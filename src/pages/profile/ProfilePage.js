import React, { useEffect, useState } from 'react';
import Logo from '../../assets/photos/CampusCart.png';
import BottomTab from '../../components/BottomTab';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ProfileInfoCard from '../../components/ProfileInfoCard';
import PostingSection from '../../components/PostingSection';

function ProfilePage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [userPostings, setUserPostings] = useState([]);

  useEffect(() => {
    const fetchUsersPostings = async () => {
      try {
        const response = await fetch(`http://localhost:8080/items/getitemsbyseller/${user.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserPostings(data);
      } catch (error) {
        console.error('Error fetching user postings:', error);
        setUserPostings([]);
      }
    };

    if (user?.id) {
      fetchUsersPostings();
    }
  }, [user?.id]);

  return (
    <div className="flex flex-col min-h-screen bg-cream transition-opacity duration-1000">
      <div className="flex-grow flex flex-col items-center py-10 px-4">
        <img src={Logo} alt="Campus Cart Logo" className="w-24 mb-2" />
        <h1 className="text-5xl mb-6 text-main_pink font-light">your profile</h1>
        <ProfileInfoCard/>
        <PostingSection title="Your Postings" items={userPostings} />
      </div>
      <BottomTab />
    </div>
  );
}

export default ProfilePage;
