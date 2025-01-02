import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TopCategories = () => {
  const categories = useSelector(state => state.categories.items);
  
  // En yüksek rating'e sahip 5 kategoriyi al
  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
      {topCategories.map(category => {
        const gender = category.gender === 'k' ? 'kadin' : 'erkek';
        return (
          <Link
            key={category.id}
            to={`/shop/${gender}/${category.code.split(':')[1]}`}
            className="group"
          >
            <div className="relative overflow-hidden rounded-lg aspect-square">
              <img
                src={category.img}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm">{category.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  );
};

export default TopCategories; 