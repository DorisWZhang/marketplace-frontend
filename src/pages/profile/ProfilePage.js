import React, { useEffect, useState } from 'react';
import Logo from '../../assets/photos/CampusCart.png';
import BottomTab from '../../components/BottomTab';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ProfileInfoCard from '../../components/ProfileInfoCard';
import PostingSection from '../../components/PostingSection';
import GoogleMap from '../../components/GoogleMap';

function ProfilePage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [userPostings, setUserPostings] = useState([]);
  const [userFavourites, setUserFavourites] = useState([]); 
  const [details, setDetails] = useState({ ...user });

  useEffect(() => {
    const fetchUsersPostings = async () => {
      try {
        const response = await fetch(`https://marketplace-backend-production-7420.up.railway.app/items/getitemsbyseller/${user.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const sellerName = user.name;
        data.forEach(item => {
          item.sellerName = sellerName; // Ensure each item has the seller name
        });
        setUserPostings(data);
      } catch (error) {
        console.error('Error fetching user postings:', error);
        setUserPostings([]);
      }
    };

    const fetchUserFavourites = async () => {
      try {
        const response = await fetch(`https://marketplace-backend-production-7420.up.railway.app/favourites/getfavourites/${user.id}`);
        if (response.ok) {
          const favourites = await response.json();
          const favouriteItems = favourites.map(fav => fav.itemId);

          // fetch all items in parallel
          const itemsData = await Promise.all(
            favouriteItems
              .filter(item => item !== null && item !== undefined)
              .map(async (item) => {
                const itemsResponse = await fetch(`https://marketplace-backend-production-7420.up.railway.app/items/getitembyid/${item}`);
                if (itemsResponse.ok) {
                  return await itemsResponse.json();
                }
                return null;
              })
          );

          // remove nulls 
          setUserFavourites(itemsData);
        }
      } catch (error) {
        console.error('Error fetching user favourites:', error);
        setUserFavourites([]);
      }
    };

    if (user?.id) {
      fetchUsersPostings();
      fetchUserFavourites();
    }
    
    // fetch user details
    if (user) {
        setDetails({ ...user });
    }
   
  }, [user?.id]);



  return (
    <div className="flex flex-col min-h-screen bg-cream transition-opacity duration-1000">
      <div className="flex-grow flex flex-col items-center py-10 px-4">
        <img src={Logo} alt="Campus Cart Logo" className="w-24 mb-2" />
        <h1 className="text-5xl mb-6 text-main_pink font-light">Your profile</h1>
        <ProfileInfoCard/>
        <PostingSection title="Your Postings" items={userPostings} />
        <PostingSection title="Your Favorites" items={userFavourites} />

      </div>
      <BottomTab />
    </div>
  );
}

export default ProfilePage;
