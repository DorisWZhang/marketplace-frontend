import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TransitionPage() {
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    const navTimer = setTimeout(() => {
      navigate('/authentrypage');
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-cream transition-opacity duration-1000 text-center px-6 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <p className="text-2xl font-light text-main_pink max-w-xl">
        Because student life means packing light and shopping smart
      </p>
    </div>
  );
}

export default TransitionPage;
