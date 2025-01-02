import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleUpdateQuantity = (productId, newCount) => {
    if (newCount < 1) return;
    dispatch({
      type: 'UPDATE_CART_ITEM',
      payload: { id: productId, count: newCount }
    });
  };

  const handleRemoveItem = (productId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId
    });
  };

  const handleToggleCheck = (productId, currentChecked) => {
    dispatch({
      type: 'TOGGLE_CART_ITEM',
      payload: { id: productId, checked: !currentChecked }
    });
  };

  const totalAmount = cartItems
    .filter(item => item.checked)
    .reduce((total, item) => total + (item.product.price * item.count), 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Alışveriş Sepeti</h1>
        <p className="text-gray-500">Sepetinizde ürün bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Alışveriş Sepeti</h1>
      
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={cartItems.every(item => item.checked)}
                  onChange={() => {
                    const allChecked = cartItems.every(item => item.checked);
                    cartItems.forEach(item => {
                      handleToggleCheck(item.product.id, allChecked);
                    });
                  }}
                  className="rounded border-gray-300"
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ürün
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fiyat
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Adet
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Toplam
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cartItems.map(item => (
              <tr key={item.product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggleCheck(item.product.id, item.checked)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-16 w-16 object-cover rounded"
                      src={item.product.images?.[0]?.url}
                      alt={item.product.name}
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
                      onClick={() => handleUpdateQuantity(item.product.id, item.count - 1)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.count}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.product.id, item.count + 1)}
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
                    onClick={() => handleRemoveItem(item.product.id)}
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

      <div className="mt-8 flex justify-end">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold mb-4">Sipariş Özeti</div>
          <div className="flex justify-between items-center">
            <span>Toplam Tutar:</span>
            <span className="text-xl font-bold">{totalAmount.toFixed(2)} TL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 