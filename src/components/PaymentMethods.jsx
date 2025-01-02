import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards, addCard, deleteCard, selectCard } from '../redux/actions/cardActions';
import { toast } from 'react-toastify';
import { CreditCard, Trash2 } from 'lucide-react';
import OrderSummary from './OrderSummary';
import { useHistory } from 'react-router-dom';

const PaymentMethods = ({ onNext }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedCard = useSelector(state => state.cards.selectedCard);
  const cartItems = useSelector(state => state.cart.items);
  
  // Memoized selectors
  const cards = useSelector(state => state.cards?.wallet || [], 
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  );
  
  const loading = useSelector(state => state.card?.loading);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  // Taksit seçenekleri
  const [selectedInstallment, setSelectedInstallment] = useState('single');
  const installmentOptions = [
    { value: 'single', label: 'Tek Çekim', amount: 6604.22 }
    // Diğer taksit seçenekleri buraya eklenebilir
  ];

  const [showOrderSummary, setShowOrderSummary] = useState(false);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  // Backend'den gelen veriyi component formatına dönüştür
  const formatBackendCard = (backendCard) => ({
    id: backendCard.id,
    cardNumber: backendCard.card_no,
    cardHolder: backendCard.name_on_card,
    expiryMonth: backendCard.expire_month.toString().padStart(2, '0'),
    expiryYear: backendCard.expire_year
  });

  // Component formatını backend formatına dönüştür
  const formatCardForBackend = (cardData) => ({
    card_no: cardData.cardNumber.replace(/\s/g, ''),
    expire_month: parseInt(cardData.expiryMonth),
    expire_year: parseInt(cardData.expiryYear),
    name_on_card: cardData.cardHolder
  });

  // Memoized handlers
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      await dispatch(addCard(formData));
      setShowForm(false);
      setFormData({
        cardNumber: '',
        cardHolder: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
      });
      // Kartları yeniden yükle
      dispatch(fetchCards());
    } catch (error) {
      console.error('Kart ekleme hatası:', error);
    }
  }, [dispatch, formData]);

  const handleDelete = useCallback(async (cardId) => {
    try {
      await dispatch(deleteCard(cardId));
    } catch (error) {
      console.error('Kart silme hatası:', error);
    }
  }, [dispatch]);

  const handleSelect = (card) => {
    dispatch(selectCard(card));
    setShowOrderSummary(true);
  };

  const handleCompleteOrder = async () => {
    try {
      const response = await api.post('/order', {
        card_id: selectedCard.id,
        items: cartItems.map(item => ({
          product_id: item.id,
          count: item.quantity
        }))
      });

      toast.success('Siparişiniz başarıyla alındı!');
      dispatch({ type: 'CLEAR_CART' }); // Sepeti temizle
      history.push('/orders'); // Siparişler sayfasına yönlendir
    } catch (error) {
      toast.error('Sipariş oluşturulurken bir hata oluştu');
    }
  };

  // Memoized formatCardNumber function
  const formatCardNumber = useMemo(() => (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(' ') : value;
  }, []);

  const getCardType = (number) => {
    // number undefined veya null ise boş string döndür
    if (!number) return '';
    
    // Kart numarası string değilse stringe çevir
    const cardNumber = number.toString();

    if (cardNumber.startsWith('4')) {
      return 'Visa';
    } else if (cardNumber.startsWith('5')) {
      return 'MasterCard';
    } else if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
      return 'American Express';
    } else {
      return 'Unknown';
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Kart ile Öde</h2>
        <p className="text-gray-600 mb-6">
          Kart ile ödemeyi seçtiniz. Banka veya Kredi Kartı kullanarak ödemenizi güvenle yapabilirsiniz.
        </p>

        <div className="space-y-6">
          {/* Kayıtlı Kartlar */}
          <div className="space-y-4">
            <h3 className="text-md font-medium">Kart Bilgileri</h3>
            <div className="flex items-center justify-between">
              <span>Kayıtlı Kartlarım</span>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Başka bir Kart ile Ödeme Yap
                </button>
              )}
            </div>

            {/* Mevcut kart listesi kodu */}
            {!showForm && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards.map(card => (
                  <div 
                    key={card.id}
                    className={`relative p-6 rounded-xl text-gray-800 shadow-lg border ${
                      card.selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="absolute top-4 right-4 space-x-2">
                      <button
                        onClick={() => handleDelete(card.id)}
                        className="p-1 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    
                    <div className="mb-4 flex items-center space-x-2">
                      {/* Kart tipi ikonları */}
                      {card.card_no.startsWith('4') && (
                        <img src="/visa.png" alt="Visa" className="h-8" />
                      )}
                      {card.card_no.startsWith('5') && (
                        <img src="/mastercard.png" alt="Mastercard" className="h-8" />
                      )}
                      <CreditCard className="w-6 h-6 text-gray-600" />
                    </div>

                    <div className="space-y-3">
                      <div className="text-lg tracking-wider font-mono">
                        {card.card_no.startsWith('4') ? `Visa **** **** ${card.card_no.slice(-4)}` : card.card_no.startsWith('5') ? `MasterCard **** **** ${card.card_no.slice(-4)}` : card.card_no.startsWith('34') || card.card_no.startsWith('37') ? `American Express **** **** ${card.card_no.slice(-4)}` : 'Kart numarası yok'}
                      </div>
                      
                      <div className="flex justify-between">
                        <div>
                          <div className="text-xs text-gray-500">Kart Sahibi</div>
                          <div className="font-medium">{card.name_on_card}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Son Kullanma</div>
                          <div className="font-medium">
                            {String(card.expire_month).padStart(2, '0')}/{card.expire_year}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelect(card)}
                      className={`mt-4 w-full py-2 rounded-lg transition-colors ${
                        card.selected
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {card.selected ? 'Seçili Kart' : 'Bu Kartı Kullan'}
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
                >
                  <span className="text-gray-600">+ Yeni Kart Ekle</span>
                </button>
              </div>
            )}
          </div>

          {/* Taksit Seçenekleri */}
          {!showForm && cards.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-md font-medium">Taksit Seçenekleri</h3>
              <p className="text-sm text-gray-600">Kartınıza uygun taksit seçeneğini seçiniz</p>
              
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Taksit Sayısı</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Aylık Ödeme</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {installmentOptions.map((option) => (
                      <tr 
                        key={option.value}
                        className={`cursor-pointer hover:bg-gray-50 ${
                          selectedInstallment === option.value ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedInstallment(option.value)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              checked={selectedInstallment === option.value}
                              onChange={() => setSelectedInstallment(option.value)}
                              className="h-4 w-4 text-blue-600"
                            />
                            <span className="ml-3">{option.label}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">
                          {option.amount.toFixed(2)} TL
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3D Secure Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="3dsecure"
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="3dsecure" className="text-sm text-gray-700">
              3D Secure ile ödemek istiyorum.
            </label>
          </div>
        </div>
      </div>

      {/* Mevcut kart ekleme formu */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Kart Numarası</label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                cardNumber: formatCardNumber(e.target.value)
              }))}
              maxLength="19"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Kart Üzerindeki İsim</label>
            <input
              type="text"
              value={formData.cardHolder}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                cardHolder: e.target.value.toUpperCase()
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="AD SOYAD"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ay</label>
              <select
                value={formData.expiryMonth}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  expiryMonth: e.target.value
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Ay</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = (i + 1).toString().padStart(2, '0');
                  return <option key={month} value={month}>{month}</option>;
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Yıl</label>
              <select
                value={formData.expiryYear}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  expiryYear: e.target.value
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Yıl</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = (new Date().getFullYear() + i).toString();
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                value={formData.cvv}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  cvv: e.target.value.replace(/\D/g, '').slice(0, 3)
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="123"
                maxLength="3"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setFormData({
                  cardNumber: '',
                  cardHolder: '',
                  expiryMonth: '',
                  expiryYear: '',
                  cvv: ''
                });
              }}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Kartı Kaydet
            </button>
          </div>
        </form>
      )}

      {/* Sipariş Özeti */}
      {showOrderSummary && (
        <div className="mt-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Sipariş Özeti</h3>
            <OrderSummary />
            <button
              onClick={handleCompleteOrder}
              className="mt-6 w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Siparişi Tamamla
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(PaymentMethods); 