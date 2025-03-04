import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/actions/orderActions';
import { ChevronDown, ChevronUp } from 'lucide-react';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.orders);
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Siparişlerim</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Sipariş Başlığı */}
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleOrderDetails(order.id)}
            >
              <div>
                <h3 className="text-lg font-semibold">Sipariş #{order.id}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-semibold">{order.price} TL</span>
                {expandedOrders[order.id] ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            {/* Sipariş Detayları (Collapsable Panel) */}
            {expandedOrders[order.id] && (
              <div className="p-4 border-t">
                <div className="grid gap-4">
                  {/* Teslimat Bilgileri */}
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-medium mb-2">Teslimat Adresi</h4>
                    <p>{order.address?.title}</p>
                    <p>{order.address?.address}</p>
                    <p>{order.address?.district}, {order.address?.city}</p>
                  </div>

                  {/* Ödeme Bilgileri */}
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-medium mb-2">Ödeme Bilgileri</h4>
                    <p>Kart: **** **** **** {order.card_no.slice(-4)}</p>
                    <p>{order.card_name}</p>
                  </div>

                  {/* Ürün Listesi */}
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Ürünler</h4>
                    <div className="divide-y">
                      {order.products?.map((product, idx) => (
                        <div key={idx} className="py-2 flex justify-between">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.detail}</p>
                          </div>
                          <div className="text-right">
                            <p>{product.count} adet</p>
                            <p className="font-medium">{product.price} TL</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Toplam */}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Toplam</span>
                      <span>{order.price} TL</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage; 