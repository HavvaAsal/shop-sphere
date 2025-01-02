import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/clientActions';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginForm({ email }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: email || '',
    }
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data));
      toast.success('Başarıyla giriş yapıldı');
      history.push('/');
    } catch (error) {
      toast.error('Giriş yapılamadı: ' + error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", { 
              required: "Email gerekli",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Geçersiz email adresi"
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Şifre</label>
          <input
            type="password"
            {...register("password", { 
              required: "Şifre gerekli",
              minLength: {
                value: 6,
                message: "Şifre en az 6 karakter olmalı"
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              {...register("rememberMe")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label 
              htmlFor="remember-me" 
              className="ml-2 block text-sm text-gray-700 cursor-pointer select-none"
            >
              Beni Hatırla
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Şifremi Unuttum
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
