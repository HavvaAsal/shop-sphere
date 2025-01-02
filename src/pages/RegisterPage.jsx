import React from 'react';
import SignupForm from '../components/SignupForm';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="py-6">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </header>

      {/* Content */}
      <main>
        <SignupForm />
      </main>

      {/* Footer */}
      <footer className="py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Zaten hesabınız var mı? <Link to="/login" className="text-blue-600 hover:text-blue-700">Giriş Yap</Link></p>
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage; 