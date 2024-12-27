import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product, viewMode = 'grid' }) => {
  if (!product) {
    return null;
  }

  // Varsayılan ürün görseli
  const defaultImage = '/images/product-card-1.jpg';
  
  // API'den gelen görsel URL'sini kontrol et
  const imageUrl = product.images?.[0] || product.image || defaultImage;

  const handleImageError = (e) => {
    e.target.src = defaultImage;
    e.target.onerror = null;
  };

  if (viewMode === 'list') {
    return (
      <div className="flex border rounded-lg p-4 hover:shadow-lg transition-shadow">
        <img 
          src={imageUrl}
          alt={product.name || product.title || 'Ürün Görseli'}
          className="w-48 h-48 object-cover rounded-lg"
          onError={handleImageError}
        />
        <div className="ml-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold">{product.name || product.title}</h3>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold">{product.price} TL</span>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`} className="block">
        <img 
          src={imageUrl}
          alt={product.name || product.title || 'Ürün Görseli'}
          className="w-full h-48 object-cover rounded-lg mb-4"
          onError={handleImageError}
        />
        <h3 className="text-lg font-semibold">{product.name || product.title}</h3>
        <p className="text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">{product.price} TL</span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              // Sepete ekleme işlemi
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Sepete Ekle
          </button>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
