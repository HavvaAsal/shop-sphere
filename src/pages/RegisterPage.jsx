import React from 'react';
import SignupForm from '../components/SignupForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md">
        <SignupForm />
      </div>
    </div>
  );
};

export default RegisterPage; 