import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const location = useLocation();
  const { email, message } = location.state || {};

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md">
        <LoginForm email={email} />
      </div>
    </div>
  );
};

export default LoginPage; 