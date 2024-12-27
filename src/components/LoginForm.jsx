import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/clientThunks';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

function LoginForm({ onLogin, onClose }) {
  const history = useHistory();
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      // Redux thunk'ı kullan
      await dispatch(loginUser({ ...data, rememberMe }));
      
      // Başarılı giriş sonrası
      if (onLogin) onLogin();
      if (onClose) onClose();
      history.push('/');
      
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Giriş başarısız!");
    }
  };

  return (
    <div className="p-4 md:p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Giriş Yap</h2>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { 
              required: "Email gerekli",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Geçerli bir email adresi giriniz"
              }
            })}
            className="block w-full px-3 py-2 md:py-2.5 text-sm md:text-base border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Email adresiniz"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Şifre
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { 
              required: "Şifre gerekli",
              minLength: {
                value: 6,
                message: "Şifre en az 6 karakter olmalıdır"
              }
            })}
            className="block w-full px-3 py-2 md:py-2.5 text-sm md:text-base border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Şifreniz"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
            Beni Hatırla
          </label>
        </div>

        {/* Butonlar için container */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Giriş Yap
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
