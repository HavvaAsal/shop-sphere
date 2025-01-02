import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CategoryDropdown = ({ isOpen }) => {
  const categories = useSelector(state => state.categories.items);
  
  // Kategorileri cinsiyete göre grupla
  const groupedCategories = categories.reduce((acc, category) => {
    const gender = category.gender === 'k' ? 'kadin' : 'erkek';
    if (!acc[gender]) {
      acc[gender] = [];
    }
    acc[gender].push(category);
    return acc;
  }, {});

  if (!isOpen) return null;

  return (
    <div className="absolute left-0 mt-2 w-screen max-w-md bg-white shadow-lg rounded-lg overflow-hidden z-50">
      <div className="grid grid-cols-2 gap-4 p-4">
        {Object.entries(groupedCategories).map(([gender, items]) => (
          <div key={gender} className="space-y-4">
            <h3 className="font-semibold text-lg capitalize">
              {gender === 'kadin' ? 'Kadın' : 'Erkek'}
            </h3>
            <div className="space-y-2">
              {items.map(category => (
                <Link
                  key={category.id}
                  to={`/shop/${gender}/${category.code.split(':')[1]}`}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md group"
                >
                  <div className="w-12 h-12 overflow-hidden rounded">
                    <img
                      src={category.img}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-blue-600">{category.title}</p>
                    {category.rating && (
                      <p className="text-sm text-gray-500">{category.rating.toFixed(1)} ★</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDropdown; 