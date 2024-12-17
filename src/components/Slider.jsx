import React from "react";

const Slider = () => {
  const sliderImage = '/images/product-slide-1.jpg';

  return (
    <div className="relative w-full h-[600px]">
      <img 
        src={sliderImage}
        alt="Hero Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-16 bg-black bg-opacity-30">
        <div className="max-w-2xl text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            SUMMER 2020
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            NEW COLLECTION
          </h1>
          <p className="text-lg md:text-xl mb-8">
            We know how large objects will act, but things on a small scale.
          </p>
          <button className="bg-[#2DC071] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-opacity-90 transition-colors">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
