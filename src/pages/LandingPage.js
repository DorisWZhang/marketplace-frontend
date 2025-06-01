import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/photos/CampusCart.png"

function LandingPage() {

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/transitionpage'); // route to transition page after 5s
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // cleanup if component unmounts early
  }, [navigate]);
  return (
    <div className="flex flex-col items-center justify-center h-screen"
      style = {{backgroundColor: "#FFFFF8"}}>
      <img src={Logo} alt="Logo"  className="w-80 max-w-sm"/>
      <h1 className="text-5xl" style = {{ color: '#C1486D', fontWeight: 400}}>
        campus cart
      </h1>
    </div>
  )
}


export default LandingPage