import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ProductDetail from "./pages/ProductDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch } from 'react-redux';
import { verifyToken } from './redux/actions/clientThunks';
import PrivateRoute from './components/PrivateRoute';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Uygulama başladığında token kontrolü
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(verifyToken());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app">
        <ToastContainer position="top-right" autoClose={3000} />
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={RegisterPage} />
          <PrivateRoute path="/product/:id" component={ProductDetail} />
          <PrivateRoute path="/cart" component={CartPage} />
          <PrivateRoute path="/checkout" component={CheckoutPage} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;