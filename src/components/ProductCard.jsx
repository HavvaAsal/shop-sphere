import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

const ProductCard = ({ product, viewMode = 'grid', gender, categoryName, categoryId }) => {
  const dispatch = useDispatch();

  if (!product) return null;

  // API'den gelen görsel URL'sini kontrol et
  const imageUrl = product.images?.[0]?.url || '/images/placeholder.jpg';

  // Ürün adından URL-friendly slug oluştur
  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  if (viewMode === 'list') {
    return (
      <div className="flex border rounded-lg p-4 hover:shadow-lg transition-shadow">
        <img 
          src={imageUrl}
          alt={product.name}
          className="w-48 h-48 object-cover rounded-lg"
          onError={(e) => e.target.src = '/images/placeholder.jpg'}
        />
        <div className="ml-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            </div>
            <div className="text-sm text-gray-500">
              Stok: {product.stock}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold">{product.price} TL</span>
            <button 
              onClick={handleAddToCart}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link 
      to={`/shop/${product.gender || 'all'}/${product.category?.code || 'all'}/${product.category_id}/${createSlug(product.name)}/${product.id}`}
      className="block border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <img 
        src={imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
        onError={(e) => e.target.src = '/images/placeholder.jpg'}
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 mt-1 line-clamp-2">{product.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="text-xl font-bold">{product.price} TL</span>
          <div className="flex items-center mt-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Stok: {product.stock}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard
