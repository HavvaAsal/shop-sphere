import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function SignUpForm({ onClose }) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const [role, setRole] = useState("customer");

  const onSubmit = async (data) => {
    try {
      // Mağaza rolüne göre ek alanları payload içine ekle
      const payload =
        role === "store"
          ? {
              ...data,
              store: {
                name: data.storeName,
                phone: data.storePhone,
                tax_no: data.storeTaxNo,
                bank_account: data.storeBankAccount,
              },
            }
          : data;

      // API çağrısı
      await axios.post("https://workintech-fe-ecommerce.onrender.com/signup", payload);

      // Başarı mesajı ve yönlendirme
      alert("Hesabınızı etkinleştirmek için e-postadaki bağlantıya tıklamanız gerekiyor!");
      onClose();
      window.history.back();
    } catch (err) {
      // API'den gelen hatayı göster
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Kayıt Formu</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Ad */}
          <div>
            <label className="block text-sm font-medium">Ad</label>
            <input
              type="text"
              {...register("name", {
                required: "Ad zorunludur.",
                minLength: { value: 3, message: "Ad en az 3 karakter olmalıdır." },
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* E-posta */}
          <div>
            <label className="block text-sm font-medium">E-posta</label>
            <input
              type="email"
              {...register("email", {
                required: "E-posta zorunludur.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Geçerli bir e-posta adresi girin.",
                },
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-sm font-medium">Şifre</label>
            <input
              type="password"
              {...register("password", {
                required: "Şifre zorunludur.",
                minLength: { value: 8, message: "Şifre en az 8 karakter olmalıdır." },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
                  message: "Şifre, rakam, küçük ve büyük harf, özel karakter içermelidir.",
                },
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Şifre Doğrulama */}
          <div>
            <label className="block text-sm font-medium">Şifre Doğrulama</label>
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (value) => value === watch("password") || "Şifreler eşleşmiyor.",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium">Rol</label>
            <select
              {...register("role_id", { required: true })}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="customer">Müşteri</option>
              <option value="admin">Yönetici</option>
              <option value="store">Mağaza</option>
            </select>
          </div>

          {/* Mağaza Rolüne Göre Ek Alanlar */}
          {role === "store" && (
            <>
              <div>
                <label className="block text-sm font-medium">Mağaza Adı</label>
                <input
                  type="text"
                  {...register("storeName", {
                    required: "Mağaza Adı zorunludur.",
                    minLength: { value: 3, message: "Mağaza Adı en az 3 karakter olmalıdır." },
                  })}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.storeName && <p className="text-red-500 text-sm">{errors.storeName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Mağaza Telefonu</label>
                <input
                  type="text"
                  {...register("storePhone", {
                    required: "Mağaza Telefonu zorunludur.",
                    pattern: {
                      value: /^(\+90|0)?5\d{9}$/,
                      message: "Geçerli bir Türkiye telefon numarası girin.",
                    },
                  })}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.storePhone && <p className="text-red-500 text-sm">{errors.storePhone.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Vergi Kimlik Numarası</label>
                <input
                  type="text"
                  {...register("storeTaxNo", {
                    required: "Vergi Kimlik Numarası zorunludur.",
                  })}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.storeTaxNo && <p className="text-red-500 text-sm">{errors.storeTaxNo.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Mağaza Banka Hesabı</label>
                <input
                  type="text"
                  {...register("storeBankAccount", {
                    required: "Banka Hesabı zorunludur.",
                  })}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.storeBankAccount && <p className="text-red-500 text-sm">{errors.storeBankAccount.message}</p>}
              </div>
            </>
          )}

          {/* Butonlar */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {isSubmitting ? (
                <span className="spinner-border animate-spin border-2 border-white rounded-full w-5 h-5"></span>
              ) : (
                "Gönder"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
