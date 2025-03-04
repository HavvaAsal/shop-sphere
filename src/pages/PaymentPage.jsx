import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCards, addCard, updateCard, deleteCard } from '../redux/actions/cardActions';
import { createOrder } from '../redux/actions/orderActions';
import CardForm from '../components/CardForm';
import { Plus, Edit2, Trash2, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cards = [] } = useSelector(state => state.cards) || { cards: [] };
  const { items: cartItems = [] } = useSelector(state => state.cart) || { items: [] };
  const checkout = useSelector(state => state.checkout) || {};
  const selectedAddress = checkout.address;
  const [selectedCard, setSelectedCard] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Toplam tutarı hesapla
  const totalAmount = cartItems.reduce((sum, item) => {
    const price = item.product?.price || 0;
    const count = item.count || 0;
    return sum + (price * count);
  }, 0);

  const handleCreateOrder = async () => {
    if (!selectedCard || !selectedAddress || cartItems.length === 0) {
      toast.error('Lütfen tüm bilgileri eksiksiz doldurun');
      return;
    }

    setProcessing(true);
    try {
      const formattedProducts = cartItems.map(item => ({
        product_id: Number(item.product.id),
        count: Number(item.count),
        detail: ""
      }));

      const orderData = {
        address_id: Number(selectedAddress.id),
        order_date: new Date().toISOString(),
        card_no: Number(selectedCard.card_no.replace(/\s/g, '')),
        card_name: selectedCard.name_on_card,
        card_expire_month: Number(selectedCard.expire_month),
        card_expire_year: Number(selectedCard.expire_year),
        card_ccv: 321,
        price: Number(totalAmount),
        products: formattedProducts
      };

      console.log('API\'ye gönderilen veri:', orderData);

      await dispatch(createOrder(orderData));
      
      toast.success('Tebrikler! Siparişiniz başarıyla alındı.');
      dispatch({ type: 'CLEAR_CART' });
      dispatch({ type: 'CLEAR_CHECKOUT_DATA' });
      
      // Ana sayfa yerine siparişler sayfasına yönlendir
      history.push('/orders');
      
    } catch (error) {
      console.error('Sipariş Hatası:', error.response?.data);
      toast.error('Sipariş oluşturulurken bir hata oluştu');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Ödeme Bilgileri</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kayıtlı Kartlar */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Kayıtlı Kartlar</h2>
          
          {cards.map(card => (
            <div 
              key={card.id}
              className={`p-4 border rounded-lg mb-4 cursor-pointer ${
                selectedCard?.id === card.id ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedCard(card)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-8 h-8 text-gray-600" />
                  <div>
                    <h3 className="font-medium">{card.name_on_card}</h3>
                    <p className="text-sm text-gray-600">
                      **** **** **** {card.card_no.slice(-4)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Son Kullanma: {card.expire_month}/{card.expire_year}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingCard(card);
                    }}
                    className="p-1 hover:text-blue-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCard(card.id);
                    }}
                    className="p-1 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ödeme Seçenekleri */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Ödeme Seçenekleri</h2>
          {selectedCard ? (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Tek Çekim</h3>
                <p className="text-lg font-semibold">{totalAmount.toFixed(2)} TL</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">3 Taksit</h3>
                <p className="text-lg font-semibold">{(totalAmount / 3).toFixed(2)} TL x 3</p>
                <p className="text-sm text-gray-500">Toplam: {totalAmount.toFixed(2)} TL</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">6 Taksit</h3>
                <p className="text-lg font-semibold">{(totalAmount / 6).toFixed(2)} TL x 6</p>
                <p className="text-sm text-gray-500">Toplam: {totalAmount.toFixed(2)} TL</p>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-6"
                onClick={handleCreateOrder}
                disabled={processing}
              >
                {processing ? 'İşleniyor...' : 'Siparişi Tamamla'}
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500 p-8">
              Ödeme seçeneklerini görmek için kart seçin
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 