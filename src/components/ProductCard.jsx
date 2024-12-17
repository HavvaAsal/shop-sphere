import React from "react";

function ProductCard({ imageNumber, title, subtitle, price }) {
    const colors = ["#23A6F0", "#23856D", "#E77C40", "#252B42"];

    // Resim yollarını dinamik olarak oluştur
    const getImagePath = (number) => {
        return new URL(`/images/product-card-${number}.jpg`, import.meta.url).href;
    };

    return (
        <div className="flex flex-col items-center">
            <img 
                src={getImagePath(imageNumber)}
                alt={title}
                className="w-full h-auto object-cover mb-4 hover:opacity-90 transition-opacity"
            />
            <h3 className="text-center text-base font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-center text-sm text-gray-600 mb-2">{subtitle}</p>
            <p className="text-center font-bold text-gray-800 mb-3">${price}</p>
            <div className="flex space-x-2">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        className="w-4 h-4 rounded-full focus:ring-2 focus:ring-offset-2"
                        style={{ backgroundColor: color }}
                        aria-label={`Color option ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductCard;
