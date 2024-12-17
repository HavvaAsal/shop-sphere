import React, { useState, useEffect } from "react";
import { User, Search, ShoppingCart, Menu } from "lucide-react";
import SignupForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import Gravatar from "react-gravatar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, Link } from 'react-router-dom';

function Header() {
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginMode, setLoginMode] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    try {
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
    }
  }, []);

  const openModal = (mode) => {
    setLoginMode(mode === "login");
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    history.push('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/product' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md relative z-40">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="container mx-auto">
        {/* Üst Kısım: Bandage ve İkonlar */}
        <div className="flex justify-between items-center px-4 py-3">
          {/* Logo ve İkonlar */}
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold">
              Bandage
            </Link>

            {/* İkonlar */}
            <div className="flex items-center space-x-4">
              {/* Login/User Icon */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <Gravatar email={user.email} size={32} className="rounded-full" />
                  <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800">
                    Logout
                  </button>
                </div>
              ) : (
                <button onClick={() => openModal("login")} className="text-gray-600 hover:text-gray-800">
                  <User className="w-6 h-6" />
                </button>
              )}
              
              {/* Search Icon */}
              <button className="text-gray-600 hover:text-gray-800">
                <Search className="w-6 h-6" />
              </button>
              
              {/* Cart Icon */}
              <button className="text-gray-600 hover:text-gray-800">
                <ShoppingCart className="w-6 h-6" />
              </button>
              
              {/* Menu Icon */}
              <button 
                className="text-gray-600 hover:text-gray-800"
                onClick={toggleMenu}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Links - Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <nav className="py-2 border-t border-gray-200">
            <ul className="flex flex-col items-center text-center">
              {navLinks.map((link) => (
                <li key={link.name} className="w-full">
                  <Link
                    to={link.path}
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:block border-t border-gray-200">
          <ul className="flex justify-center items-center space-x-8 py-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            {isLoginMode ? (
              <>
                <LoginForm onClose={closeModal} onLogin={handleLogin} />
                <div className="flex justify-between items-center mt-4 border-t pt-4">
                  <button
                    onClick={() => setLoginMode(false)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <SignupForm onClose={closeModal} />
                <div className="flex justify-end mt-4 border-t pt-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
