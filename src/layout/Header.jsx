import React, { useState } from "react";
import { User, Search, ShoppingCart, Menu } from "lucide-react";
import SignupForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm"; // LoginForm bileşeni

function Header() {
  const [isModalOpen, setModalOpen] = useState(false); // Modal durumu
  const [isLoginMode, setLoginMode] = useState(true); // Modalda login mi signup mı gösterilecek
  const [isMenuOpen, setMenuOpen] = useState(false); // Menü durumu
  const [isLoggedIn, setLoggedIn] = useState(false); // Kullanıcı giriş yapmış mı?

  const openModal = (mode) => {
    setLoginMode(mode === "login"); // Hangi mod olduğunu belirle
    setModalOpen(true); // Modal'ı aç
  };

  const closeModal = () => setModalOpen(false); // Modal'ı kapat
  const toggleMenu = () => setMenuOpen((prev) => !prev); // Menü durumunu değiştir

  return (
    <header className="bg-white shadow-md relative z-40">
      {/* Üst Kısım: Bandage ve İkonlar */}
      <div className="flex justify-between items-center px-4 py-2">
        {/* Bandage Yazısı */}
        <h1 className="text-lg font-bold text-gray-700 pl-2">Bandage</h1>

        {/* İkonlar */}
        <div className="flex space-x-4 pr-2">
          <Search className="w-5 h-5 text-gray-600" />
          {!isLoggedIn ? (
            <>
              {/* Kullanıcı giriş yapmadıysa Login ve Signup */}
              <User
                className="w-5 h-5 text-gray-600 cursor-pointer"
                onClick={() => openModal("login")} // Login modalını aç
              />
            </>
          ) : (
            <>
              {/* Kullanıcı giriş yaptıysa Logout */}
              <button
                onClick={() => {
                  setLoggedIn(false); // Kullanıcı çıkış yapar
                  alert("Çıkış yapıldı!");
                }}
                className="text-gray-600 hover:text-red-600 text-sm"
              >
                Logout
              </button>
            </>
          )}
          <ShoppingCart className="w-5 h-5 text-gray-600" />
          <Menu
            className="w-5 h-5 text-gray-600 cursor-pointer"
            onClick={toggleMenu} // Menü ikonuna tıklanınca menü açılır/kapanır
          />
        </div>
      </div>

      {/* Modal açıldığında doğru form gösterilir */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 shadow-md w-80">
            {isLoginMode ? (
              <LoginForm
              onClose={closeModal}
              onLogin={() => {
                setLoggedIn(true);
                closeModal();
              }}
              onSwitchToSignup={() => setLoginMode(false)} // Sign up formuna geç
            />
            ) : (
              <SignupForm
                onClose={closeModal} // Modal'ı kapatma fonksiyonu
              />
            )}
          </div>
        </div>
      )}

      {/* Alt Kısım: Linkler */}
      {isMenuOpen && ( // Menü açık olduğunda linkleri göster
        <nav className="flex flex-col items-center space-y-2 py-4 bg-gray-50">
          <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
            Product
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
            Pricing
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}

export default Header;
