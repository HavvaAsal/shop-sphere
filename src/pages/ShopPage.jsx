// src/pages/ShopPage.jsx
import React, { useState, useEffect } from 'react';

const ShopPage = () => {
  const shopImages = [
    "/images/shop-page1.jpg",
    "/images/shop-page2.jpg",
    "/images/shop-page3.jpg",
    "/images/shop-page4.jpg",
    "/images/shop-page5.jpg",
  ];

  const productImages = [
    "/images/shop-card-1.jpg",
    "/images/shop-card-2.jpg",
    "/images/shop-card-3.jpeg",
    "/images/shop-card-4.jpg",
    "/images/shop-card-5.jpeg",
    "/images/shop-card-6.jpeg",
    "/images/shop-card-7.jpeg",
    "/images/shop-card-8.jpeg",
    "/images/shop-card-9.jpeg",
    "/images/shop-card-10.jpeg",
    "/images/shop-card-11.jpeg",
    "/images/shop-card-12.jpeg",
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // İlk durum
  const itemsPerPage = 4; // Mobilde her sayfada kaç resim gösterilecek

  // Ekran boyutunu dinlemek için useEffect
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sayfa başına görüntülenecek ürünler (mobil için)
  const paginatedImages = productImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Görüntülenecek ürünler
  const displayedImages = isMobile ? paginatedImages : productImages;

  // Toplam sayfa sayısı
  const totalPages = Math.ceil(productImages.length / itemsPerPage);

  return (
    <div className="p-4">
      {/* Shop Heading */}
      <h1 className="text-2xl font-bold mb-4 text-center">Shop</h1>

      {/* Shop Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {shopImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Shop Page ${index + 1}`}
            className="w-full h-auto border rounded-lg"
          />
        ))}
      </div>

      {/* View Options */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-600">Views:</span>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Grid</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">List</button>
        </div>
      </div>

      {/* Product Images Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedImages.map((src, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <img
              src={src}
              alt={`Product ${index + 1}`}
              className="w-full h-auto"
            />
            <h2 className="mt-2 font-bold text-center">Product {index + 1}</h2>
            <p className="text-center text-gray-600">${(index + 1) * 10}</p>
          </div>
        ))}
      </div>

      {/* Pagination Section (Hem mobil hem desktop için) */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          className={`px-4 py-2 border rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 border rounded-lg ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`px-4 py-2 border rounded-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopPage;
