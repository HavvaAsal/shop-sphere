import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../config/api';

const SignupForm = () => {
  const history = useHistory();
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      role_id: '1', // Customer default
    }
  });

  const selectedRole = watch('role_id');
  const password = watch('password');

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
      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id
      };

      if (data.role_id === '2') {
        formData.store = {
          name: data.store_name,
          phone: data.store_phone,
          tax_no: data.tax_no,
          bank_account: data.bank_account
        };
      }

      await api.post('/signup', formData);
      toast.success('Hesabınızı aktifleştirmek için emailinizi kontrol edin!');
      
      // Önce login sayfasına yönlendir
      history.push('/login', { 
        email: formData.email, // Email'i login sayfasına geçirelim
        message: 'Kayıt başarılı! Lütfen giriş yapın.'
      });

    } catch (error) {
      toast.error(error.response?.data?.message || 'Kayıt olurken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8 bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Ad Soyad */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
            <input
              {...register("name", {
                required: "Ad Soyad zorunludur",
                minLength: {
                  value: 3,
                  message: "Ad Soyad en az 3 karakter olmalıdır"
                }
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email", {
                required: "Email zorunludur",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Geçerli bir email adresi giriniz"
                }
              })}
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Şifre</label>
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          {/* Şifre Tekrar */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Şifre Tekrar</label>
            <input
              {...register("confirmPassword", {
                required: "Şifre tekrarı zorunludur",
                validate: value => value === password || "Şifreler eşleşmiyor"
              })}
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
          </div>

          {/* Rol Seçimi */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Hesap Türü</label>
            <select
              {...register("role_id")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>

          {/* Mağaza Bilgileri */}
          {selectedRole === '2' && (
            <div className="space-y-6 border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900">Mağaza Bilgileri</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mağaza Adı</label>
                  <input
                    {...register("store_name", {
                      required: "Mağaza adı zorunludur",
                      minLength: {
                        value: 3,
                        message: "Mağaza adı en az 3 karakter olmalıdır"
                      }
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.store_name && <span className="text-red-500 text-sm">{errors.store_name.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Telefon</label>
                  <input
                    {...register("store_phone", {
                      required: "Telefon zorunludur",
                      pattern: {
                        value: /^(\+90|0)?[0-9]{10}$/,
                        message: "Geçerli bir Türkiye telefon numarası giriniz"
                      }
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+90"
                  />
                  {errors.store_phone && <span className="text-red-500 text-sm">{errors.store_phone.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Vergi Numarası</label>
                  <input
                    {...register("tax_no", {
                      required: "Vergi numarası zorunludur",
                      pattern: {
                        value: /^T\d{4}V\d{6}$/,
                        message: "Geçerli bir vergi numarası giriniz (TXXXXVXXXXXX)"
                      }
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="TXXXXVXXXXXX"
                  />
                  {errors.tax_no && <span className="text-red-500 text-sm">{errors.tax_no.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">IBAN</label>
                  <input
                    {...register("bank_account", {
                      required: "IBAN zorunludur",
                      pattern: {
                        value: /^TR\d{2}\d{5}[A-Z0-9]{17}$/,
                        message: "Geçerli bir IBAN giriniz"
                      }
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="TR..."
                  />
                  {errors.bank_account && <span className="text-red-500 text-sm">{errors.bank_account.message}</span>}
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Kaydediliyor...
                </div>
              ) : (
                'Kayıt Ol'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;