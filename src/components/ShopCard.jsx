import React from 'react';
import { Link } from 'react-router-dom';

function ShopCard({ title, link, type }) {
    const getImage = (title) => {
        const imageMap = {
            'MEN': 1,
            'WOMEN': 2,
            'ACCESSORIES': 3,
            'KIDS': 4
        };
        const imageNumber = imageMap[title] || 1;
        return new URL(`/images/shop-card-${imageNumber}.jpg`, import.meta.url).href;
    };

    return (
        <Link to={link} className="relative group overflow-hidden h-full block">
            <div className="relative h-full">
                <img
                    src={getImage(title)}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6">
                    <h3 className="text-white text-xl font-semibold tracking-wider">{title}</h3>
                </div>
            </div>
        </Link>
    );
}

export default ShopCard;
