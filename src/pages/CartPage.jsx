import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { items = [] } = useSelector(state => state.cart || {});

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sepetiniz Boş</h2>
          <Link 
            to="/shop" 
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Alışverişe Başla
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Alışveriş Sepeti</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ürün Listesi */}
        <div className="lg:col-span-2">
          {items.map(item => (
            <div 
              key={item.id} 
              className="flex items-center border-b py-4"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="ml-4 flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.price} TL</p>
                <div className="flex items-center mt-2">
                  <button className="px-2 py-1 border rounded">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="px-2 py-1 border rounded">+</button>
                </div>
              </div>
              <button className="text-red-500">Kaldır</button>
            </div>
          ))}
        </div>

        {/* Özet */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{calculateTotal().toFixed(2)} TL</span>
            </div>
            <div className="flex justify-between">
              <span>Kargo</span>
              <span>Ücretsiz</span>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Toplam</span>
              <span>{calculateTotal().toFixed(2)} TL</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="block text-center bg-blue-500 text-white py-2 rounded-lg mt-6"
          >
            Ödemeye Geç
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 