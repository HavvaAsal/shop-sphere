import React from "react";

const Slider = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/product-slide-1.jpg')" }}>
    
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50">
        <p className="text-2xl mb-2">Summer 2020</p>
        <h1 className="text-3xl font-medium mb-4">NEW COLLECTION</h1>
        <p className="text-2xl max-w-xs mb-6">
          We know how large objects will act, but things on a small scale.
        </p>
        <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default Slider;
