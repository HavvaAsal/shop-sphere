import React from "react";

function ProductSlider() {
  return (
    <div className="bg-green-500 text-white p-6 rounded-md w-full max-w-md mx-auto">
      {/* Başlık Bölümü */}
      <div className="text-center mb-4">
        <p className="text-sm font-semibold uppercase">SUMMER 2020</p>
        <h2 className="text-2xl font-bold mt-2">Vita Classic Product</h2>
        <p className="text-sm mt-2">
          We know how large objects will act, but things on a small scale.
        </p>
      </div>

      {/* Fiyat ve Buton */}
      <div className="text-center my-4">
        <p className="text-xl font-semibold">$16.48</p>
        <button className="bg-green-700 px-4 py-2 mt-2 text-white font-medium rounded hover:bg-green-600">
          ADD TO CART
        </button>
      </div>

      {/* Navigasyon Okları */}
      <div className="flex justify-between items-center mt-6">
      <button className="text-white text-2xl">{"<"}</button>
        <img
          src="/path/to/image.jpg"
          alt="Product"
          className="w-32 h-32 rounded-full"
        />
        <button className="text-white text-2xl">{">"}</button>
      </div>
    </div>
  );
}

export default ProductSlider;
