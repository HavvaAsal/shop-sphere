import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/actions/orderActions';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Siparişlerim</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Sipariş #{order.id}</h3>
              <span className="text-gray-600">{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
            {/* Sipariş detayları */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage; 