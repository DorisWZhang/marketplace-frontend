import React, { useEffect, useState } from 'react';
import ItemCard from '../../components/ItemCard';
import BottomTab from '../../components/BottomTab';
import Logo from '../../assets/photos/CampusCart.png';

function MarketplacePage() {
  const [items, setItems] = useState([]);
  const userLocation = 'UBC';

  useEffect(() => {
    const mockItems = [
      {
        id: 1,
        title: "Mini Fridge",
        price: 75,
        location: "UBC",
        postedAt: "2025-06-01T14:32:00Z",
        views: 120,
        image: "https://via.placeholder.com/150x150.png?text=Mini+Fridge"
      },
      {
        id: 2,
        title: "Textbook: Data Structures",
        price: 40,
        location: "SFU",
        postedAt: "2025-06-02T10:00:00Z",
        views: 30,
        image: "https://via.placeholder.com/150x150.png?text=Textbook"
      },
      {
        id: 3,
        title: "Office Chair",
        price: 50,
        location: "UBC",
        postedAt: "2025-05-29T18:45:00Z",
        views: 85,
        image: "https://via.placeholder.com/150x150.png?text=Office+Chair"
      },
      {
        id: 4,
        title: "iPad Air (4th Gen)",
        price: 400,
        location: "Langara",
        postedAt: "2025-06-03T08:30:00Z",
        views: 220,
        image: "https://via.placeholder.com/150x150.png?text=iPad"
      },
      {
        id: 5,
        title: "LED Desk Lamp",
        price: 15,
        location: "UBC",
        postedAt: "2025-06-03T07:00:00Z",
        views: 10,
        image: "https://via.placeholder.com/150x150.png?text=Desk+Lamp"
      },
      {
        id: 6,
        title: "Laptop Stand",
        price: 20,
        location: "SFU",
        postedAt: "2025-05-28T16:00:00Z",
        views: 55,
        image: "https://via.placeholder.com/150x150.png?text=Laptop+Stand"
      },
      {
        id: 7,
        title: "Air Fryer",
        price: 60,
        location: "UBC",
        postedAt: "2025-06-01T12:00:00Z",
        views: 90,
        image: "https://via.placeholder.com/150x150.png?text=Air+Fryer"
      },
      {
        id: 8,
        title: "Bed Frame (Queen)",
        price: 100,
        location: "Langara",
        postedAt: "2025-06-02T15:15:00Z",
        views: 45,
        image: "https://via.placeholder.com/150x150.png?text=Bed+Frame"
      },
      {
        id: 9,
        title: "MacBook Charger (USB-C)",
        price: 25,
        location: "UBC",
        postedAt: "2025-06-03T09:00:00Z",
        views: 15,
        image: "https://via.placeholder.com/150x150.png?text=Charger"
      },
      {
        id: 10,
        title: "Monitor (27” 1080p)",
        price: 130,
        location: "SFU",
        postedAt: "2025-06-01T20:00:00Z",
        views: 70,
        image: "https://via.placeholder.com/150x150.png?text=Monitor"
      }
    ];

    setItems(mockItems);
  }, []);

  const itemsNearYou = items.filter((item) => item.location === userLocation);
  const newlyPosted = [...items].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  const popularItems = items.filter((item) => item.views > 50);

  const Section = ({ title, items }) => (
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

  return (
    <div className="flex flex-col h-screen bg-cream">
      <div className="flex-grow overflow-y-auto px-4 py-10 flex flex-col items-center">
        <img src={Logo} alt="Campus Cart Logo" className="w-24 mb-2" />
        <h1 className="text-5xl mb-8 text-main_pink font-light">campus cart</h1>

        <Section title="Near You" items={itemsNearYou} />
        <Section title="Newly Posted" items={newlyPosted} />
        <Section title="Popular" items={popularItems} />
      </div>

      <div className="sticky bottom-0 w-full">
        <BottomTab />
      </div>
    </div>
  );
}

export default MarketplacePage;
