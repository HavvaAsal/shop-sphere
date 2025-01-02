import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { updateCartItem, removeFromCart } from '../redux/actions/cartActions';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items = [] } = useSelector(state => state.cart);
  const history = useHistory();

  // Ürün miktarını güncelle
  const updateQuantity = (productId, newCount) => {
    if (newCount < 1) return;
    dispatch(updateCartItem(productId, newCount));
  };

  // Ürünü sepetten kaldır
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Seçili ürünlerin toplam tutarı
  const calculateTotal = () => {
    return items
      .filter(item => item.checked)
      .reduce((total, item) => total + (item.product.price * item.count), 0);
  };

  // Ürün seçim durumunu güncelle
  const toggleCheck = (productId) => {
    const item = items.find(item => item.product.id === productId);
    if (item) {
      dispatch(updateCartItem(productId, item.count, !item.checked));
    }
  };

  // Sipariş özeti hesaplamaları
  const calculateSummary = () => {
    const subtotal = items
      .filter(item => item.checked)
      .reduce((total, item) => total + (item.product.price * item.count), 0);

    const shipping = subtotal > 150 ? 0 : 29.99; // 150 TL üzeri ücretsiz kargo
    const discount = shipping === 0 ? 29.99 : 0; // Kargo bedava ise indirim olarak göster

    return {
      subtotal,
      shipping,
      discount,
      total: subtotal + shipping - discount
    };
  };

  const handleCheckout = () => {
    history.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sepetiniz Boş</h2>
          <Link 
            to="/shop"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
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
        {/* Sepet Tablosu - col-span-2 ile daha geniş alan */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input 
                    type="checkbox"
                    checked={items.every(item => item.checked)}
                    onChange={() => {
                      const allChecked = items.every(item => item.checked);
                      items.forEach(item => {
                        dispatch(updateCartItem(item.product.id, item.count, !allChecked));
                      });
                    }}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ürün
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fiyat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Miktar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Toplam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlem
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map(item => (
                <tr key={item.product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleCheck(item.product.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={item.product.images[0].url} 
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.product.price} TL</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.count - 1)}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.count}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.count + 1)}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {(item.product.price * item.count).toFixed(2)} TL
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleRemove(item.product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sipariş Özeti - Sağ tarafta */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-6">Sipariş Özeti</h2>
            
            <div className="space-y-4">
              {/* Ürün Toplamı */}
              <div className="flex justify-between text-gray-600">
                <span>Ürünlerin Toplamı</span>
                <span>{calculateSummary().subtotal.toFixed(2)} TL</span>
              </div>

              {/* Kargo Ücreti */}
              <div className="flex justify-between text-gray-600">
                <span>Kargo Ücreti</span>
                <span>{calculateSummary().shipping.toFixed(2)} TL</span>
              </div>

              {/* İndirim - Varsa göster */}
              {calculateSummary().discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Kargo İndirimi</span>
                  <span>-{calculateSummary().discount.toFixed(2)} TL</span>
                </div>
              )}

              {/* Çizgi */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Genel Toplam */}
              <div className="flex justify-between text-lg font-semibold">
                <span>Toplam</span>
                <span>{calculateSummary().total.toFixed(2)} TL</span>
              </div>

              {/* Kargo Bedava Bilgisi */}
              {calculateSummary().shipping > 0 && (
                <div className="bg-blue-50 text-blue-600 p-3 rounded-md text-sm mt-4">
                  {(150 - calculateSummary().subtotal).toFixed(2)} TL daha alışveriş yapın, kargo bedava!
                </div>
              )}

              {/* Sepeti Onayla Butonu */}
              <button
                onClick={handleCheckout}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Sepeti Onayla
              </button>

              {/* Bilgilendirme Notları */}
              <div className="mt-4 space-y-2 text-xs text-gray-500">
                <p>• 150 TL ve üzeri alışverişlerinizde kargo bedava!</p>
                <p>• Satın almadan önce indirim kodunuz varsa uygulayabilirsiniz.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 