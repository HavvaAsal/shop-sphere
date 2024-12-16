// App.js
import React, { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import "./index.css";
import ShopCard from "./components/ShopCard";
import ProductCard from "./components/ProductCard";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(true); // Login veya Signup formunu kontrol eden state
  const [user, setUser] = useState(null); // Kullanıcı durumunu takip eden state

  // Login işlemi
  const handleLoginSubmit = async (data) => {
    try {
      console.log("Gönderilen veri:", data); // Gönderilen veriyi kontrol edin
      const response = await axios.post(
        "https://workintech-fe-ecommerce.onrender.com/login",
        data
      );

      // Başarılı giriş işlemi sonrası token'i kaydet
      const { token, user } = response.data;
      localStorage.setItem("token", token); // Token'i localStorage'a kaydet
      setUser(user); // Kullanıcıyı state'e kaydet
      alert("Giriş başarılı!");
    } catch (err) {
      console.error("Hata ayrıntıları:", err.response?.data || err);
      alert(err.response?.data?.message || "Giriş sırasında bir hata oluştu.");
    }
  };

  // Kayıt işlemi sonrası işlem
  const handleSignupSuccess = () => {
    setIsLogin(true); // Kayıt işleminden sonra login formuna geri dön
  };

  // Logout işlemi
  const handleLogout = () => {
    localStorage.removeItem("token"); // Token'i sil
    setUser(null); // Kullanıcıyı sıfırla
    alert("Çıkış yapıldı.");
  };

  // Token'i kontrol ederek kullanıcı durumunu güncelle
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Token varsa, kullanıcıyı doğrulamak için backend'e istek yapılabilir
      axios
        .get("https://workintech-fe-ecommerce.onrender.com/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user); // Kullanıcıyı güncelle
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  return (
    <>
      <HomePage />
      <ShopCard />
      <ProductCard />

      {/* Kullanıcı giriş yapmışsa */}
      {user ? (
        <div className="p-4">
          <p>Merhaba, {user.name}!</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Çıkış Yap
          </button>
        </div>
      ) : (
        // Giriş yapılmamışsa Login veya Signup formunu göster
        isLogin ? (
          <LoginForm
            onSubmit={handleLoginSubmit} // handleLoginSubmit tanımlı olmalı
            onSwitchToSignup={() => setIsLogin(false)}
            onClose={() => console.log("Login form kapatıldı")}
          />


        ) : (
          <SignUpForm
            onClose={() => setIsLogin(true)}
            onSignupSuccess={handleSignupSuccess}
          />
        )
      )}
    </>
  );
}

export default App;
