import React from "react";
import { useForm } from "react-hook-form";

function LoginForm({ onSubmit, onSwitchToSignup, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form gönderildiğinde çağrılacak fonksiyon
  const submitHandler = (data) => {
    console.log("Form verisi:", data); // Test etmek için
    if (onSubmit) {
      onSubmit(data);
    } else {
      console.error("onSubmit fonksiyonu sağlanmamış.");
    }
  };


  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Login</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className="block w-full px-3 py-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="block w-full px-3 py-2 border rounded-md"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Login
        </button>
      </form>

      {/* Switch to Signup */}
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <button
          onClick={onSwitchToSignup}
          className="text-blue-600 hover:underline"
        >
          Create an account
        </button>
      </p>

      {/* Cancel */}
      <button
        onClick={onClose}
        className="mt-4 text-sm text-gray-500 hover:text-gray-700 text-center w-full"
      >
        Cancel
      </button>
    </div>
  );
}

export default LoginForm;
