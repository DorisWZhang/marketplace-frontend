import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/photos/CampusCart.png";

function LandingPage() {
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    const navTimer = setTimeout(() => {
      navigate('/transitionpage');
    }, 3000);
    console.log("GOOGLE MAPS:", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    console.log("GOOGLE MAPS:", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);


    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-cream transition-opacity duration-1000 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <img src={Logo} alt="Campus Cart Logo" className="w-40 mb-4" />
      <p className="text-xl text-center text-main_pink px-4 font-light">
        Welcome to Campus Cart
      </p>
    </div>
  );
}

export default LandingPage;
