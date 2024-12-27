import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => 
    state.items.find(item => item.id === Number(id))
  );

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-xl font-bold">Ürün bulunamadı</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile View */}
      <div className="md:hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-xl font-bold text-blue-600 mb-4">
          {product.price} TL
        </p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg">
          Sepete Ekle
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-2 gap-8">
        <div>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {product.images?.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`${product.name} ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-6">
            {product.price} TL
          </p>
          <p className="text-gray-600 mb-8">{product.description}</p>
          <button className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600">
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 