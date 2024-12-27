import React from 'react';

const CheckoutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Ödeme</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Teslimat Bilgileri */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Teslimat Bilgileri</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Ad Soyad</label>
              <input 
                type="text" 
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Adres</label>
              <textarea 
                className="w-full border rounded-lg p-2"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Telefon</label>
              <input 
                type="tel" 
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
          </form>
        </div>

        {/* Ödeme Bilgileri */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Ödeme Bilgileri</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Kart Numarası</label>
              <input 
                type="text" 
                className="w-full border rounded-lg p-2"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Son Kullanma Tarihi</label>
                <input 
                  type="text" 
                  className="w-full border rounded-lg p-2"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">CVV</label>
                <input 
                  type="text" 
                  className="w-full border rounded-lg p-2"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Ödemeyi Tamamla
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 