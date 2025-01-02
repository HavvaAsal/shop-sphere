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
import CategoryDropdown from '../components/CategoryDropdown';

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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(state => state.client);
  const cartItemCount = useSelector(state => state.cart.items.length);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold">
            Bandage
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>

            <div className="relative group">
              <div className="flex items-center space-x-1">
                <Link to="/shop" className="hover:text-blue-600">
                  Shop
                </Link>
                <button
                  onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                  className="hover:text-blue-600 focus:outline-none p-1"
                >
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${
                      isShopDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
              <CategoryDropdown isOpen={isShopDropdownOpen} />
            </div>

            <Link to="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link to="/blog" className="hover:text-blue-600">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <ProfileMenu />
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowLogin(true)}
                  className="hover:text-blue-600"
                >
                  <User className="h-6 w-6" />
                </button>
              </div>
            )}

            <Link to="/cart" className="relative hover:text-blue-600">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <Link to="/" className="block py-2">
              Home
            </Link>
            <Link to="/shop" className="block py-2">
              Shop
            </Link>
            <Link to="/about" className="block py-2">
              About
            </Link>
            <Link to="/blog" className="block py-2">
              Blog
            </Link>
            <Link to="/contact" className="block py-2">
              Contact
            </Link>
          </div>
        )}
      </div>

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <LoginForm onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}

      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <SignupForm onClose={() => setShowSignup(false)} />
          </div>
        </div>
      )}

      <ToastContainer />
    </header>
  );
};

export default Header;
