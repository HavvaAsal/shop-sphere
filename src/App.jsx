import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ProductDetail from "./pages/ProductDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch } from 'react-redux';
import { verifyToken } from './redux/actions/clientActions';
import PrivateRoute from './components/PrivateRoute';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrdersPage from './pages/OrdersPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(verifyToken());
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <ToastContainer position="top-right" autoClose={3000} />
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" component={ProductDetail} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={RegisterPage} />
          <PrivateRoute path="/product/:id" component={ProductDetail} />
          <PrivateRoute path="/cart" component={CartPage} />
          <PrivateRoute path="/checkout" component={CheckoutPage} />
          <PrivateRoute path="/orders" component={OrdersPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;