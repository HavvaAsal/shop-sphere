import React, { useState } from "react";
import { User, Search, ShoppingCart, Menu } from "lucide-react";
import SignupForm from "../components/SignUpForm";


function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal'ın açık olup olmadığını kontrol et

  const openModal = () => setIsModalOpen(true); // Modal'ı aç
  const closeModal = () => setIsModalOpen(false); // Modal'ı kapat

  return (
    <header className="bg-white shadow-md">
      {/* Üst Kısım: Bandage ve İkonlar */}
      <div className="flex justify-between items-center px-4 py-2">
        {/* Bandage Yazısı */}
        <h1 className="text-lg font-bold text-gray-700 pl-2">Bandage</h1>
        
        {/* İkonlar */}
        <div className="flex space-x-4 pr-2">
          <Search className="w-5 h-5 text-gray-600" />
          <User className="w-5 h-5 text-gray-600 cursor-pointer" onClick={openModal} /> {/* User ikonuna tıklanınca modal açılır */}
          <ShoppingCart className="w-5 h-5 text-gray-600" />
          <Menu className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* Modal açıldığında SignUpForm bileşeni eklenir */}
      {isModalOpen && <SignupForm onClose={closeModal} />}

      {/* Alt Kısım: Linkler */}
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
    </header>
  );
}

export default Header;
