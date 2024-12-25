import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/actions/clientThunks';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { ENDPOINTS } from "../config/api";

function SignUpForm({ onClose, onSignupSuccess }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [role, setRole] = useState("customer");
  const password = watch("password");

  const onSubmit = async (data) => {
    // Password validation
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    await dispatch(signupUser(data));
    
    history.push('/');// Dispatch the thunk

    if (onClose) {
      onClose(); // Close the form if onClose is provided
    }
  };

  return (
    <div className="p-4 max-h-[80vh] overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 sticky top-0 bg-white py-2">Kayıt Ol</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Rol Seçimi */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Hesap Türü</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="customer">Müşteri</option>
            <option value="store">Mağaza</option>
            <option value="admin">Yönetici</option>
          </select>
        </div>

        {/* Ad */}
        <div>
          <label className="block text-sm font-medium">Ad</label>
          <input
            type="text"
            {...register("name", {
              required: "Ad zorunludur",
              minLength: { value: 3, message: "Ad en az 3 karakter olmalıdır" }
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email zorunludur",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Geçersiz email adresi"
              }
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
              required: "Şifre zorunludur",
              minLength: { value: 6, message: "Şifre en az 6 karakter olmalıdır" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                message: "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir"
              }
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Şifre Doğrulama */}
        <div>
          <label className="block text-sm font-medium">Şifre Tekrar</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Şifre tekrarı zorunludur",
              validate: value => value === password || "Şifreler eşleşmiyor"
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        {/* Mağaza bilgileri (sadece role === "store" ise göster) */}
        {role === "store" && (
          <>
            <div>
              <label className="block text-sm font-medium">Mağaza Adı</label>
              <input
                type="text"
                {...register("storeName", { required: "Mağaza adı zorunludur" })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.storeName && <p className="text-red-500 text-sm">{errors.storeName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Mağaza Telefonu</label>
              <input
                type="text"
                {...register("storePhone", { required: "Mağaza telefonu zorunludur" })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.storePhone && <p className="text-red-500 text-sm">{errors.storePhone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Vergi No</label>
              <input
                type="text"
                {...register("storeTaxNo", { required: "Vergi no zorunludur" })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.storeTaxNo && <p className="text-red-500 text-sm">{errors.storeTaxNo.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Banka Hesabı</label>
              <input
                type="text"
                {...register("storeBankAccount", { required: "Banka hesabı zorunludur" })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.storeBankAccount && <p className="text-red-500 text-sm">{errors.storeBankAccount.message}</p>}
            </div>
          </>
        )}

        <div className="flex justify-between items-center sticky bottom-0 bg-white py-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Kayıt Ol
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
