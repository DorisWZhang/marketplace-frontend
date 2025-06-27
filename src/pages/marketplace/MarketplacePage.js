import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../../components/ItemCard';
import BottomTab from '../../components/BottomTab';
import Logo from '../../assets/photos/CampusCart.png';
import { BsFileEarmarkPlus } from "react-icons/bs";
import Modal from '../../components/Modal';
import CreateListingPage from './CreateListingPage';
import PostingSection from '../../components/PostingSection';
import SearchSection from '../../components/SearchSection';
import ConversationsList from '../../components/ConversationsList';

function MarketplacePage() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const userLocation = 'UBC';
  const navigate = useNavigate();
  const [showConversations, setShowConversations] = useState(false);

  useEffect(() => {
  const mockItems = [
    {
      id: 1,
      title: "Mini Fridge",
      description: "Compact mini fridge perfect for dorm use.",
      price: 75,
      location: "UBC",
      postedAt: "2025-06-01T14:32:00Z",
      views: 120,
      image: "https://via.placeholder.com/150x150.png?text=Mini+Fridge",
      sellerName: "Alex Johnson"
    },
    {
      id: 2,
      title: "Textbook: Data Structures",
      description: "Used textbook for CPSC 221 in great condition.",
      price: 40,
      location: "SFU",
      postedAt: "2025-06-02T10:00:00Z",
      views: 30,
      image: "https://via.placeholder.com/150x150.png?text=Textbook",
      sellerName: "Mei Ling"
    },
    {
      id: 3,
      title: "Office Chair",
      description: "Ergonomic office chair with lumbar support.",
      price: 50,
      location: "UBC",
      postedAt: "2025-05-29T18:45:00Z",
      views: 85,
      image: "https://via.placeholder.com/150x150.png?text=Office+Chair",
      sellerName: "Daniel Chen"
    },
    {
      id: 4,
      title: "iPad Air (4th Gen)",
      description: "iPad with 64GB storage and no scratches.",
      price: 400,
      location: "Langara",
      postedAt: "2025-06-03T08:30:00Z",
      views: 220,
      image: "https://via.placeholder.com/150x150.png?text=iPad",
      sellerName: "Sarah Lee"
    },
    {
      id: 5,
      title: "LED Desk Lamp",
      description: "Minimalist desk lamp with brightness control.",
      price: 15,
      location: "UBC",
      postedAt: "2025-06-03T07:00:00Z",
      views: 10,
      image: "https://via.placeholder.com/150x150.png?text=Desk+Lamp",
      sellerName: "Jacob Nguyen"
    },
    {
      id: 6,
      title: "Laptop Stand",
      description: "Adjustable aluminum laptop stand.",
      price: 20,
      location: "SFU",
      postedAt: "2025-05-28T16:00:00Z",
      views: 55,
      image: "https://via.placeholder.com/150x150.png?text=Laptop+Stand",
      sellerName: "Emily Park"
    },
    {
      id: 7,
      title: "Air Fryer",
      description: "Compact air fryer, barely used.",
      price: 60,
      location: "UBC",
      postedAt: "2025-06-01T12:00:00Z",
      views: 90,
      image: "https://via.placeholder.com/150x150.png?text=Air+Fryer",
      sellerName: "Tony Zhao"
    },
    {
      id: 8,
      title: "Bed Frame (Queen)",
      description: "Queen-sized metal bed frame, easy assembly.",
      price: 100,
      location: "Langara",
      postedAt: "2025-06-02T15:15:00Z",
      views: 45,
      image: "https://via.placeholder.com/150x150.png?text=Bed+Frame",
      sellerName: "Rina Kapoor"
    },
    {
      id: 9,
      title: "MacBook Charger (USB-C)",
      description: "60W USB-C charger for MacBook Pro/Air.",
      price: 25,
      location: "UBC",
      postedAt: "2025-06-03T09:00:00Z",
      views: 15,
      image: "https://via.placeholder.com/150x150.png?text=Charger",
      sellerName: "Carlos Perez"
    },
    {
      id: 10,
      title: "Monitor (27” 1080p)",
      description: "27-inch FHD monitor, perfect for coding.",
      price: 130,
      location: "SFU",
      postedAt: "2025-06-01T20:00:00Z",
      views: 70,
      image: "https://via.placeholder.com/150x150.png?text=Monitor",
      sellerName: "Lena Wu"
    }
  ];

  setItems(mockItems);
}, []);


  const itemsNearYou = items.filter((item) => item.location === userLocation);
  const newlyPosted = [...items].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  const popularItems = items.filter((item) => item.views > 50);

  return (
    <div className="flex flex-col h-screen bg-cream">
      <div className="flex-grow overflow-y-auto px-4 py-10 flex flex-col items-center">
        <img src={Logo} alt="Campus Cart Logo" className="w-24 mb-2" />
        <h1 className="text-5xl mb-8 text-main_pink font-light">campus cart</h1>
        <SearchSection setItems={setItems} />

        <PostingSection title="Near You" items={itemsNearYou} />
        <PostingSection title="Newly Posted" items={newlyPosted} />
        <PostingSection title="Popular" items={popularItems} />
      </div>

      {/* Floating circular "+" button */}
      <button
        className="fixed right-8 bottom-24 z-50 bg-main_pink text-white rounded-full w-16 h-16 flex items-center justify-center text-4xl leading-none p-0 shadow-lg hover:bg-pink-600 transition"
        aria-label="Add Listing"
        onClick={() => setShowModal(true)}
      >
        <BsFileEarmarkPlus/>
      </button>

      {/* Floating circular "💬" button for conversations */}
      <button
        className="fixed right-8 top-8 z-50 bg-main_pink text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-lg hover:bg-pink-600 transition"
        aria-label="Open Conversations"
        onClick={() => setShowConversations(true)}
      >
        💬
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateListingPage onClose={() => setShowModal(false)} />
        </Modal>
      )}

      {showConversations && (
        <Modal onClose={() => setShowConversations(false)}>
          <ConversationsList />
        </Modal>
      )}

      <div className="sticky bottom-0 w-full">
        <BottomTab />
      </div>
    </div>
  );
}

export default MarketplacePage;
