import React from 'react';
import { useForm } from 'react-hook-form';

const CardForm = ({ onSubmit, initialData = null }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {}
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Kart Üzerindeki İsim</label>
        <input
          {...register("name_on_card", { required: "Kart üzerindeki isim gerekli" })}
          className="w-full border rounded-lg p-2"
          placeholder="Ad Soyad"
        />
        {errors.name_on_card && (
          <span className="text-red-500 text-sm">{errors.name_on_card.message}</span>
        )}
      </div>

      <div>
        <label className="block mb-1">Kart Numarası</label>
        <input
          {...register("card_no", {
            required: "Kart numarası gerekli",
            pattern: {
              value: /^[0-9]{16}$/,
              message: "Geçerli bir kart numarası giriniz"
            }
          })}
          className="w-full border rounded-lg p-2"
          placeholder="1234 5678 9012 3456"
          maxLength="16"
        />
        {errors.card_no && (
          <span className="text-red-500 text-sm">{errors.card_no.message}</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Son Kullanma Ay</label>
          <select
            {...register("expire_month", { required: "Son kullanma ayı gerekli" })}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Ay Seçin</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>
                {month.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
          {errors.expire_month && (
            <span className="text-red-500 text-sm">{errors.expire_month.message}</span>
          )}
        </div>

        <div>
          <label className="block mb-1">Son Kullanma Yıl</label>
          <select
            {...register("expire_year", { required: "Son kullanma yılı gerekli" })}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Yıl Seçin</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.expire_year && (
            <span className="text-red-500 text-sm">{errors.expire_year.message}</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        {initialData ? 'Kartı Güncelle' : 'Kart Ekle'}
      </button>
    </form>
  );
};

export default CardForm; 