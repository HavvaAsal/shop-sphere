import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/actions/orderActions';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { items: orders, loading, error } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <div className="container mx-auto p-4">Yükleniyor...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-600">Hata: {error}</div>;

  const formatDate = (dateString) => {
    try {
      if (!dateString) return '';
      return format(parseISO(dateString), 'dd MMMM yyyy', { locale: tr });
    } catch (error) {
      console.error('Tarih formatı hatası:', error);
      return 'Geçersiz tarih';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Siparişlerim</h1>
      
      <div className="space-y-4">
        {orders?.map(order => (
          <div key={order.id} className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Sipariş No: #{order.id}</p>
                  <p className="text-sm text-gray-600">
                    Tarih: {formatDate(order.created_at)}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status === 'completed' ? 'Tamamlandı' :
                   order.status === 'pending' ? 'Beklemede' : 
                   order.status}
                </span>
              </div>
            </div>

            <div className="p-4">
              {/* Teslimat Bilgileri */}
              {order.address && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Teslimat Adresi</h3>
                  <p>{order.address.title}</p>
                  <p>{order.address.name} {order.address.surname}</p>
                  <p>{order.address.address}</p>
                  <p>{order.address.district}/{order.address.city}</p>
                </div>
              )}

              {/* Ürün Listesi */}
              <div>
                <h3 className="font-semibold mb-2">Ürünler</h3>
                <div className="space-y-2">
                  {order.items?.map((item, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center py-2 border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium">{item.product?.name}</p>
                        <p className="text-sm text-gray-600">Adet: {item.count}</p>
                      </div>
                      <p className="font-medium">
                        {((item.product?.price || 0) * item.count).toFixed(2)} TL
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toplam */}
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="font-semibold">Toplam</span>
                <span className="font-semibold text-lg">
                  {(order.total || 0).toFixed(2)} TL
                </span>
              </div>
            </div>
          </div>
        ))}

        {!orders?.length && (
          <p className="text-center text-gray-500">Henüz siparişiniz bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage; 