import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddressForm from '../components/AddressForm';
import PaymentMethods from '../components/PaymentMethods';
import OrderSummary from '../components/OrderSummary';
import { useHistory } from 'react-router-dom';

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const cartItems = useSelector(state => state.cart.items);
  const selectedAddress = useSelector(state => state.address?.selectedAddress);
  const selectedCard = useSelector(state => state.cards?.selectedCard);
  const dispatch = useDispatch();
  const history = useHistory();

  const steps = useMemo(() => [
    { id: 1, title: 'Teslimat Adresi' },
    { id: 2, title: 'Ödeme Yöntemi' }
  ], []);

  const handleNext = () => {
    setStep(current => current + 1);
  };

  const handleBack = () => {
    setStep(current => current - 1);
  };

  const handleSelectAddress = (address) => {
    // Redux store'a adresi kaydet
    dispatch({ type: 'SET_SHIPPING_ADDRESS', payload: address });
    // Konsola yazdırarak kontrol et
    console.log('Selected Address:', address);
    // Ödeme sayfasına yönlendir
    history.push('/payment');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AddressForm onNext={handleNext} />;
      case 2:
        return (
          <PaymentMethods 
            onNext={handleNext} 
            onBack={handleBack}
            selectedAddress={selectedAddress}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Adım göstergesi */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((s) => (
            <div 
              key={s.id}
              className={`flex-1 text-center ${
                step === s.id 
                  ? 'text-blue-600 font-semibold' 
                  : step > s.id 
                    ? 'text-green-600' 
                    : 'text-gray-400'
              }`}
            >
              <div className="relative">
                <div className={`
                  w-8 h-8 mx-auto rounded-full flex items-center justify-center
                  ${step === s.id ? 'bg-blue-100 text-blue-600' : 
                    step > s.id ? 'bg-green-100 text-green-600' : 
                    'bg-gray-100 text-gray-400'}
                `}>
                  {step > s.id ? '✓' : s.id}
                </div>
                <div className="mt-2">{s.title}</div>
                {s.id !== steps.length && (
                  <div className={`
                    absolute top-4 -right-1/2 w-full h-0.5
                    ${step > s.id ? 'bg-green-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adım içeriği */}
      <div className="max-w-3xl mx-auto">
        {renderStep()}
      </div>
    </div>
  );
};

export default CheckoutPage; 