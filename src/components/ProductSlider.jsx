import React from "react";

function ProductSlider() {
  const sliderImage = '/images/product-slider-man.png';

  return (
    <div className="bg-[#23856D] text-white relative h-[600px] flex items-center">
      {/* Ana İçerik */}
      <div className="w-full max-w-md mx-auto px-8 z-10">
        {/* Başlık Bölümü */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium uppercase tracking-wide mb-4">
            SUMMER 2020
          </p>
          <h2 className="text-3xl font-bold mb-4">
            Vita Classic Product
          </h2>
          <p className="text-sm opacity-80 max-w-xs mx-auto">
            We know how large objects will act, but things on a small scale.
          </p>
        </div>

        {/* Fiyat ve Buton */}
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold">$16.48</p>
          <button className="bg-[#2DC071] px-8 py-2.5 text-white font-medium rounded hover:bg-opacity-90 transition-colors">
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Navigasyon Okları */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl opacity-70 hover:opacity-100 transition-opacity z-20"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl opacity-70 hover:opacity-100 transition-opacity z-20"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Arka Plan Resmi */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={sliderImage}
          alt="Model in white sweater"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default ProductSlider;