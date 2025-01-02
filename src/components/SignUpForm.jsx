import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, Link } from 'react-router-dom';
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
    reset,
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
      reset();
      toast.success('Hesabınızı aktifleştirmek için emailinizi kontrol edin!');
      history.push('/login', {
        email: formData.email,
        message: 'Kayıt başarılı! Lütfen giriş yapın.'
      });
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Kayıt olurken bir hata oluştu');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md">
        <div className="max-h-[70vh] overflow-y-auto p-8">
          <form id="signup-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Ad Soyad */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
              <input
                {...register("name", {
                  required: "Lütfen adınızı ve soyadınızı girin",
                  minLength: {
                    value: 3,
                    message: "Ad ve soyad en az 3 karakter olmalıdır"
                  },
                  pattern: {
                    value: /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
                    message: "Ad ve soyad sadece harf içermelidir"
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
                  required: "Lütfen email adresinizi girin",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Geçerli bir email adresi giriniz (örnek: ad@domain.com)"
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
                  required: "Lütfen bir şifre belirleyin",
                  minLength: {
                    value: 8,
                    message: "Şifreniz en az 8 karakter olmalıdır"
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/,
                    message: "Şifreniz en az bir rakam, bir küçük harf, bir büyük harf ve bir özel karakter (!@#$%^&*) içermelidir"
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
                        required: "Lütfen telefon numaranızı girin",
                        pattern: {
                          value: /^(\+90|0)?[0-9]{10}$/,
                          message: "Geçerli bir Türkiye telefon numarası giriniz (Örnek: 05XX XXX XX XX)"
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
                        required: "Lütfen vergi numaranızı girin",
                        pattern: {
                          value: /^T\d{4}V\d{6}$/,
                          message: "Vergi numarası T ile başlamalı, 4 rakam, V harfi ve 6 rakam içermelidir (Örnek: T1234V567890)"
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
                        required: "Lütfen IBAN numaranızı girin",
                        pattern: {
                          value: /^TR\d{2}\d{5}[A-Z0-9]{17}$/,
                          message: "Geçerli bir IBAN giriniz (TR ile başlamalı ve 26 karakter olmalıdır)"
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
          </form>
        </div>

        <div className="p-4 bg-gray-50 border-t sticky bottom-0">
          <div className="flex gap-4">
            {/* İptal Butonu */}
            <button
              type="button"
              onClick={() => {
                const confirmCancel = window.confirm('Kayıt işlemini iptal etmek istediğinize emin misiniz?');
                if (confirmCancel) {
                  reset();
                  history.push('/');
                }
              }}
              className="w-1/3 py-3 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              İptal
            </button>

            {/* Kayıt Ol Butonu */}
            <button
              type="submit"
              form="signup-form"
              disabled={isLoading}
              className="w-2/3 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
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
        </div>
      </div>
    </div>
  );
};

export default SignupForm;