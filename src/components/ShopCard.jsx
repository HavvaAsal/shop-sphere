import React from "react";

function ShopCard() {
  return (
    <div className="bg-white p-4">
      {/***** Başlık Bölümü ******/}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">EDITOR’S PICK</h2>
        <p className="text-gray-600 text-sm">
          Problems trying to resolve the conflict between
        </p>
      </div>

      {/***** Kartlar Bölümü *****/}
      <div className="grid grid-cols-1 gap-6">
       
        <div className="relative">
          <img
            src="/images/filter.jpg"
            alt="Men"
            className="w-full h-auto"
          />
          <div className="absolute bottom-4 left-4 bg-white px-2 py-1 text-sm font-bold">
            MEN
          </div>
        </div>

        <div className="relative">
          <img
            src="/images/filter (1).jpg"
            alt="Women"
            className="w-full h-auto"
          />
          <div className="absolute bottom-4 left-4 bg-white px-2 py-1 text-sm font-bold">
            WOMEN
          </div>
        </div>

        <div className="relative">
          <img
            src="/images/filter (2).jpg"
            alt="Accessories"
            className="w-full h-auto"
          />
          <div className="absolute bottom-4 left-4 bg-white px-2 py-1 text-sm font-bold">
            ACCESSORIES
          </div>
        </div>

        <div className="relative">
          <img
            src="/images/filter (3).jpg"
            alt="Kids"
            className="w-full h-auto"
          />
          <div className="absolute bottom-4 left-4 bg-white px-2 py-1 text-sm font-bold">
            KIDS
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCard;
