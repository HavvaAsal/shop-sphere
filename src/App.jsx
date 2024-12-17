import React from "react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./index.css";
import Header from "./layout/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <ToastContainer position="top-right" autoClose={3000} />
        <Header />
        <HomePage />
      </div>
    </BrowserRouter>
  );
}

export default App;