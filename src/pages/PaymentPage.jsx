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
  const { cards, loading } = useSelector(state => state.cards);
  const { items: cartItems } = useSelector(state => state.cart);
  const selectedAddress = useSelector(state => state.checkout.selectedAddress);
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Toplam tutarı hesapla
  const totalAmount = cartItems.reduce((sum, item) => 
    sum + (item.product.price * item.count), 0
  );

  const handleCreateOrder = async () => {
    if (!selectedCard || !selectedAddress || cartItems.length === 0) {
      toast.error('Lütfen tüm bilgileri eksiksiz doldurun');
      return;
    }

    setProcessing(true);
    try {
      const orderData = {
        address_id: selectedAddress.id,
        card_no: selectedCard.card_no,
        card_name: selectedCard.name_on_card,
        card_expire_month: selectedCard.expire_month,
        card_expire_year: selectedCard.expire_year,
        card_ccv: "123", // Güvenlik için gerçek CCV saklanmıyor
        price: totalAmount,
        products: cartItems.map(item => ({
          product_id: item.product.id,
          count: item.count,
          detail: item.detail || ""
        }))
      };

      await dispatch(createOrder(orderData));
      
      // Başarılı sipariş sonrası ana sayfaya yönlendir
      history.push('/');
      toast.success('Siparişiniz başarıyla oluşturuldu! Teşekkür ederiz.');
    } catch (error) {
      console.error('Sipariş oluşturma hatası:', error);
      toast.error('Sipariş oluşturulurken bir hata oluştu');
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const handleAddCard = async (data) => {
    try {
      await dispatch(addCard(data));
      setShowCardForm(false);
    } catch (error) {
      console.error('Kart ekleme hatası:', error);
    }
  };

  const handleUpdateCard = async (data) => {
    try {
      await dispatch(updateCard({ ...data, id: editingCard.id }));
      setEditingCard(null);
    } catch (error) {
      console.error('Kart güncelleme hatası:', error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Bu kartı silmek istediğinizden emin misiniz?')) {
      try {
        await dispatch(deleteCard(cardId));
      } catch (error) {
        console.error('Kart silme hatası:', error);
      }
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

          <button
            onClick={() => setShowCardForm(true)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-4"
          >
            <Plus className="w-5 h-5" />
            Yeni Kart Ekle
          </button>
        </div>

        {/* Ödeme Seçenekleri */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Ödeme Seçenekleri</h2>
          {selectedCard ? (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Tek Çekim</h3>
                <p className="text-lg font-semibold">8.449,99 TL</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">3 Taksit</h3>
                <p className="text-lg font-semibold">2.816,66 TL x 3</p>
                <p className="text-sm text-gray-500">Toplam: 8.449,99 TL</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">6 Taksit</h3>
                <p className="text-lg font-semibold">1.408,33 TL x 6</p>
                <p className="text-sm text-gray-500">Toplam: 8.449,99 TL</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 p-8">
              Ödeme seçeneklerini görmek için kart seçin
            </div>
          )}
        </div>
      </div>

      {/* Kart Formu Modal */}
      {(showCardForm || editingCard) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              {editingCard ? 'Kartı Düzenle' : 'Yeni Kart Ekle'}
            </h2>
            <CardForm
              onSubmit={editingCard ? handleUpdateCard : handleAddCard}
              initialData={editingCard}
            />
            <button
              onClick={() => {
                setShowCardForm(false);
                setEditingCard(null);
              }}
              className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Ödeme Butonu */}
      <div className="mt-8">
        <button
          className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={!selectedCard || processing}
          onClick={handleCreateOrder}
        >
          {processing ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              İşleniyor...
            </div>
          ) : (
            'Ödemeyi Tamamla'
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage; 