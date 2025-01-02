import React, { useEffect, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { productId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // Selector'ı memoize et
  const { product, loading, error } = useSelector(state => state.products.detail);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success('Ürün sepete eklendi');
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-600">Hata: {error}</div>;
  }

  if (!product) {
    return <div className="container mx-auto p-4">Ürün bulunamadı</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Geri Dön
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.images?.[0]?.url || '/placeholder.jpg'} 
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-blue-600">
              {product.price?.toFixed(2)} TL
            </div>
            <div className="text-sm text-gray-500">
              Stok: {product.stock}
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="text-yellow-400">★</span>
            <span>{product.rating?.toFixed(1)}</span>
            <span>({product.sell_count} satış)</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`w-full md:w-auto px-6 py-3 rounded-md text-white ${
              product.stock > 0 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 