import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses, addAddress, updateAddress, deleteAddress, selectAddress } from '../redux/actions/addressActions';

const AddressForm = ({ onNext }) => {
  const dispatch = useDispatch();
  const { items: addresses = [], loading } = useSelector(state => state.address || {});
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    address: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await dispatch(updateAddress({ ...formData, id: editingId }));
      } else {
        await dispatch(addAddress(formData));
      }
      setShowForm(false);
      setFormData({});
      setEditingId(null);
    } catch (error) {
      console.error('Adres kaydetme hatası:', error);
    }
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteAddress(id));
    } catch (error) {
      console.error('Adres silme hatası:', error);
    }
  };

  const handleSelect = (address) => {
    dispatch(selectAddress(address));
    onNext?.();
  };

  return (
    <div className="space-y-4">
      {/* Adres Listesi */}
      {!showForm && (
        <div className="space-y-4">
          {addresses.map(address => (
            <div 
              key={address.id} 
              className="border rounded-lg p-4 space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{address.title}</h3>
                  <p>{address.name} {address.surname}</p>
                  <p>{address.address}</p>
                  <p>{address.district}/{address.city}</p>
                  <p>{address.phone}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Sil
                  </button>
                  <button
                    onClick={() => handleSelect(address)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Bu Adresi Kullan
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => setShowForm(true)}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
          >
            + Yeni Adres Ekle
          </button>
        </div>
      )}

      {/* Adres Formu */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Adres Başlığı</label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ad</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Soyad</label>
              <input
                type="text"
                name="surname"
                value={formData.surname || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, surname: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Telefon</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">İl</label>
              <input
                type="text"
                name="city"
                value={formData.city || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">İlçe</label>
              <input
                type="text"
                name="district"
                value={formData.district || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Adres</label>
              <textarea
                name="address"
                value={formData.address || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setFormData({});
                setEditingId(null);
              }}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingId ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddressForm; 