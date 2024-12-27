import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/actions/clientThunks';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import api from '../config/api';

function SignupForm({ onClose }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('1'); // 1: Customer default
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      role_id: '1', // Customer default
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch('password');

  // Rolleri yükle
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/roles');
        setRoles(response.data);
      } catch (error) {
        toast.error('Roller yüklenirken hata oluştu');
      }
    };
    fetchRoles();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(signupUser(data));
      toast.success('Kayıt başarılı! Email aktivasyonunuzu tamamlayın!');
      if (onClose) onClose();
      history.goBack();
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Kayıt Ol</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Ad Soyad */}
        <div>
          <label className="block mb-2 text-sm font-medium">Ad Soyad</label>
          <input
            {...register("name", {
              required: "Ad Soyad zorunludur",
              minLength: {
                value: 3,
                message: "Ad Soyad en az 3 karakter olmalıdır"
              }
            })}
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            {...register("email", {
              required: "Email zorunludur",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Geçerli bir email adresi giriniz"
              }
            })}
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Şifre */}
        <div>
          <label className="block mb-2 text-sm font-medium">Şifre</label>
          <input
            {...register("password", {
              required: "Şifre zorunludur",
              minLength: {
                value: 8,
                message: "Şifre en az 8 karakter olmalıdır"
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/,
                message: "Şifre en az bir rakam, bir küçük harf, bir büyük harf ve bir özel karakter içermelidir"
              }
            })}
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Şifre Tekrar */}
        <div>
          <label className="block mb-2 text-sm font-medium">Şifre Tekrar</label>
          <input
            {...register("confirmPassword", {
              required: "Şifre tekrarı zorunludur",
              validate: value => value === password || "Şifreler eşleşmiyor"
            })}
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Rol Seçimi */}
        <div>
          <label className="block mb-2 text-sm font-medium">Üyelik Tipi</label>
          <select
            {...register("role_id")}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Store Bilgileri */}
        {selectedRole === '2' && (
          <>
            <div>
              <label className="block mb-2 text-sm font-medium">Mağaza Adı</label>
              <input
                {...register("store_name", {
                  required: "Mağaza adı zorunludur",
                  minLength: {
                    value: 3,
                    message: "Mağaza adı en az 3 karakter olmalıdır"
                  }
                })}
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.store_name && (
                <p className="mt-1 text-sm text-red-600">{errors.store_name.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Mağaza Telefonu</label>
              <input
                {...register("store_phone", {
                  required: "Telefon zorunludur",
                  pattern: {
                    value: /^(\+90|0)?[0-9]{10}$/,
                    message: "Geçerli bir Türkiye telefon numarası giriniz"
                  }
                })}
                type="tel"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.store_phone && (
                <p className="mt-1 text-sm text-red-600">{errors.store_phone.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Vergi Numarası</label>
              <input
                {...register("store_tax_no", {
                  required: "Vergi numarası zorunludur",
                  pattern: {
                    value: /^T\d{4}V\d{6}$/,
                    message: "Geçerli bir vergi numarası giriniz (TXXXXVXXXXXX)"
                  }
                })}
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.store_tax_no && (
                <p className="mt-1 text-sm text-red-600">{errors.store_tax_no.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">IBAN</label>
              <input
                {...register("store_bank_account", {
                  required: "IBAN zorunludur",
                  pattern: {
                    value: /^TR\d{2}\d{5}[A-Z0-9]{17}$/,
                    message: "Geçerli bir IBAN giriniz"
                  }
                })}
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.store_bank_account && (
                <p className="mt-1 text-sm text-red-600">{errors.store_bank_account.message}</p>
              )}
            </div>
          </>
        )}

        {/* Butonlar için container */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Kaydediliyor...
              </div>
            ) : (
              'Kayıt Ol'
            )}
          </button>
          
          <button
            type="button"
            onClick={onClose || (() => history.goBack())}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
