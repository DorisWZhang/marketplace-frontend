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
  const [userFavourites, setUserFavourites] = useState([]); 

  useEffect(() => {
    const fetchUsersPostings = async () => {
      try {
        const response = await fetch(`http://localhost:8080/items/getitemsbyseller/${user.id}`);
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
        const response = await fetch(`http://localhost:8080/favourites/getfavourites/${user.id}`);
        if (response.ok) {
          const favourites = await response.json();
          const favouriteItems = favourites.map(fav => fav.itemId);

          // fetch all items in parallel
          const itemsData = await Promise.all(
            favouriteItems
              .filter(item => item !== null && item !== undefined)
              .map(async (item) => {
                const itemsResponse = await fetch(`http://localhost:8080/items/getitembyid/${item}`);
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
    
   
  }, [user?.id]);

  return (
    <div className="flex flex-col min-h-screen bg-cream transition-opacity duration-1000">
      <div className="flex-grow flex flex-col items-center py-10 px-4">
        <img src={Logo} alt="Campus Cart Logo" className="w-24 mb-2" />
        <h1 className="text-5xl mb-6 text-main_pink font-light">your profile</h1>
        <ProfileInfoCard/>
        <PostingSection title="Your Postings" items={userPostings} />
        <PostingSection title="Your Favorites" items={userFavourites} />
      </div>
      <BottomTab />
    </div>
  );
}

export default ProfilePage;
