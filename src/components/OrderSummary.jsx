import React from 'react';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
  const { items: cartItems } = useSelector(state => state.cart);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 29.99; // Sabit kargo ücreti
  const total = subtotal + shipping;

  return (
    <div className="space-y-4">
      {/* Ürün Listesi */}
      <div className="space-y-3">
        {cartItems.map((item) => (
          <div 
            key={`${item.product.id}-${item.size}-${item.color}`} 
            className="flex justify-between"
          >
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-500">
                {item.count} adet - {item.size} - {item.color}
              </p>
            </div>
            <p className="font-medium">
              {(item.product.price * item.count).toFixed(2)} TL
            </p>
          </div>
        ))}
      </div>

      {/* Alt Toplam */}
      <div className="border-t pt-4">
        <div className="flex justify-between">
          <span>Ara Toplam</span>
          <span>{subtotal.toFixed(2)} TL</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Kargo</span>
          <span>{shipping.toFixed(2)} TL</span>
        </div>
        <div className="flex justify-between mt-4 font-bold text-lg">
          <span>Toplam</span>
          <span>{total.toFixed(2)} TL</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary; 