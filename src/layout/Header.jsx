import React, { useState, useEffect } from "react";
import { User, Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import SignupForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import Gravatar from "react-gravatar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/clientActions';
import { fetchCategories } from '../redux/actions/categoryActions';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.client);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        {user?.email && <Gravatar email={user.email} size={32} className="rounded-full" />}
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 text-sm text-gray-700 border-b">
            {user?.email}
          </div>
          <Link
            to="/orders"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Siparişlerim
          </Link>
          <button
            onClick={() => {
              dispatch(logout());
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
};

function Header() {
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginMode, setLoginMode] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector(state => state.client);
  const dispatch = useDispatch();
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const categories = useSelector(state => state.categories.items);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const groupedCategories = categories?.reduce((acc, category) => {
    if (!category?.gender || !category?.name) return acc;
    
    if (!acc[category.gender]) {
      acc[category.gender] = [];
    }
    acc[category.gender].push(category);
    return acc;
  }, {}) || {};

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'Pages', path: '/pages' }
  ];

  const openModal = (mode) => {
    setLoginMode(mode === "login");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setLoginMode(true); // Reset to login mode when closing
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <header className="bg-white shadow-md relative z-40">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="container mx-auto">
        <div className="flex justify-between items-center px-4 py-3">
          <Link to="/" className="text-2xl font-bold">
            Bandage
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <ProfileMenu />
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => openModal("login")}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                >
                  <User className="w-5 h-5" />
                  <span>Giriş Yap</span>
                </button>
                <button 
                  onClick={() => openModal("signup")}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Kayıt Ol
                </button>
              </div>
            )}
            
            <button className="text-gray-600 hover:text-gray-800">
              <Search className="w-6 h-6" />
            </button>
            
            <Link 
              to="/cart"
              className="text-gray-600 hover:text-gray-800"
            >
              <ShoppingCart className="w-6 h-6" />
            </Link>
            
            <button 
              className="md:hidden text-gray-600 hover:text-gray-800"
              onClick={toggleMenu}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Links - Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden fixed inset-0 bg-white z-50">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <Link to="/" className="text-2xl font-bold">
                  Bandage
                </Link>
                <button 
                  onClick={toggleMenu}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <ul className="flex-1 flex flex-col items-center justify-center space-y-6 py-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-xl text-gray-600 hover:text-gray-900"
                      onClick={toggleMenu}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:block border-t border-gray-200">
          <ul className="flex justify-center items-center space-x-8 py-4">
            {navLinks.map((link) => {
              if (link.name === 'Shop') {
                return (
                  <li 
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setIsShopDropdownOpen(true)}
                    onMouseLeave={() => setIsShopDropdownOpen(false)}
                  >
                    <Link 
                      to="/shop"
                      className="text-gray-600 hover:text-gray-900 py-2"
                    >
                      Shop
                    </Link>
                    
                    {/* Dropdown Menu */}
                    {isShopDropdownOpen && Object.keys(groupedCategories).length > 0 && (
                      <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white border rounded-lg shadow-lg z-50">
                        <div className="p-8">
                          <div className="grid grid-cols-2 gap-8">
                            {Object.entries(groupedCategories).map(([gender, cats]) => (
                              <div key={gender} className="space-y-6">
                                {/* Cinsiyet Başlığı */}
                                <div className="border-b pb-2">
                                  <h3 className="text-xl font-bold capitalize">
                                    {gender === 'kadin' ? 'Kadın' : 'Erkek'}
                                  </h3>
                                </div>

                                {/* Kategori Grid */}
                                <div className="grid grid-cols-2 gap-6">
                                  {cats.map(category => (
                                    <Link
                                      key={category.id}
                                      to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${category.code}/${category.id}`}
                                      className="group"
                                      onClick={() => setIsShopDropdownOpen(false)}
                                    >
                                      <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-gray-100">
                                        <img
                                          src={category.img}
                                          alt={category.title}
                                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                          onError={(e) => {
                                            e.target.src = '/images/placeholder.jpg';
                                          }}
                                        />
                                      </div>
                                      <h4 className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                                        {category.title}
                                      </h4>
                                      {category.rating && (
                                        <p className="text-xs text-gray-500 mt-1">
                                          {category.rating} ★
                                        </p>
                                      )}
                                    </Link>
                                  ))}
                                </div>

                                {/* Tümünü Gör Linki */}
                                <Link 
                                  to={`/shop/${gender}`}
                                  className="inline-block text-sm text-blue-600 hover:text-blue-800 font-medium"
                                  onClick={() => setIsShopDropdownOpen(false)}
                                >
                                  Tümünü Gör →
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {isLoginMode ? 'Giriş Yap' : 'Kayıt Ol'}
                </h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {isLoginMode ? (
                <LoginForm 
                  onSuccess={() => {
                    closeModal();
                    history.push('/');
                  }} 
                />
              ) : (
                <SignupForm 
                  onSuccess={() => {
                    closeModal();
                    history.push('/');
                  }}
                />
              )}

              <div className="mt-4 text-center">
                <button
                  onClick={() => setLoginMode(!isLoginMode)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {isLoginMode ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten üye misiniz? Giriş yapın'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
