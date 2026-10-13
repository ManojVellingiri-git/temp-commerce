// react 
import React from "react";
// css
import "./App.css";
// browserrouter 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// Components
import Header from './Component/Header';
import Footer from "./Component/Footer";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
// pages
import Home from "./pages/Home";
// About pages
import AboutUs from "./pages/About/AboutUs";
import Blog from "./pages/About/Blog";
import BlogCategory from "./pages/About/BlogCategory";
import Contact from "./pages/About/Contact";
// Shop pages
import Shop from "./pages/Shop/Shop";
import ShopGridCol3 from "./pages/Shop/ShopGridCol3";
import ShopListCol from "./pages/Shop/ShopListCol";
import ShopCart from "./pages/Shop/ShopCart";
import ShopCheckOut from "./pages/Shop/ShopCheckOut";
import OrderSuccess from "./pages/Shop/OrderSuccess";
import ShopWishList from "./pages/Shop/ShopWishList";

// Account pages
import MyAccountOrder from "./pages/Accounts/MyAccountOrder";
import MyAccountSetting from "./pages/Accounts/MyAcconutSetting";
import MyAcconutNotification from "./pages/Accounts/MyAcconutNotification";
import MyAcconutPaymentMethod from "./pages/Accounts/MyAcconutPaymentMethod";
import MyAccountAddress from "./pages/Accounts/MyAccountAddress";
import MyAccountForgetPassword from "./pages/Accounts/MyAccountForgetPassword";
import MyAccountSignIn from "./pages/Accounts/MyAccountSignIn";
import MyAccountSignUp from "./pages/Accounts/MyAccountSignUp";
import FAQ from "./pages/FooterElements/Faq";
import Coupons from "./pages/FooterElements/Coupons";
import Careers from "./pages/FooterElements/Careers";
import HelpCenter from "./pages/FooterElements/HelpCenter";
// Admin Layout & Pages
import AdminLayout from './admin/layout/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import Products from './admin/pages/Products';
import ProductCreate from './admin/pages/ProductCreate';
import ProductEdit from './admin/pages/ProductEdit';
import Categories from './admin/pages/Categories';
import Orders from './admin/pages/Orders';
import Customers from './admin/pages/Customers';
import Inventory from './admin/pages/Inventory';
import AdminCoupons from './admin/pages/Coupons';
import Banners from './admin/pages/Banners';
import Analytics from './admin/pages/Analytics';
import Settings from './admin/pages/Settings';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from './components/routing/ProtectedRoute';
import AdminRoute from './components/routing/AdminRoute';

const CustomerLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const App = () => {
  return (
    <div>
      <CartProvider>
        <WishlistProvider>
          <Router>
            
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="products/new" element={<ProductCreate />} />
              <Route path="products/edit/:id" element={<ProductEdit />} />
              <Route path="categories" element={<Categories />} />
              <Route path="orders" element={<Orders />} />
              <Route path="customers" element={<Customers />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="coupons" element={<AdminCoupons />} />
              <Route path="banners" element={<Banners />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Customer Routes */}
          <Route element={<CustomerLayout />}>

          <Route path="/" element={<Home />} />
          {/* Shop pages */}
          <Route path="/Shop" element={<Shop />} />
          <Route path="/ShopGridCol3" element={<ShopGridCol3 />} />
          <Route path="/ShopListCol" element={<ShopListCol />} />
          <Route path="/ShopWishList" element={<ShopWishList />} />
          
          <Route path="/ShopCart" element={<ShopCart />} />
          {/* Store routes redirected */}
          <Route path="/StoreList" element={<Navigate to="/Shop" replace />} />
          <Route path="/SingleShop" element={<Navigate to="/Shop" replace />} />
          {/* Accounts pages */}
          <Route element={<ProtectedRoute />}>
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
            <Route path="/ShopCheckOut" element={<ShopCheckOut />} />
            <Route path="/MyAccountOrder" element={<MyAccountOrder />} />
            <Route path="/MyAccountSetting" element={<MyAccountSetting />} />
            <Route path="/MyAcconutNotification" element={<MyAcconutNotification />} />
            <Route path="/MyAcconutPaymentMethod" element={<MyAcconutPaymentMethod />} />
            <Route path="/MyAccountAddress" element={<MyAccountAddress />} />
          </Route>
          
          <Route path="/MyAccountForgetPassword" element={<MyAccountForgetPassword />} />
          <Route path="/MyAccountSignIn" element={<MyAccountSignIn />} />
          <Route path="/MyAccountSignUp" element={<MyAccountSignUp />} />
          {/* About pages */}
          <Route path="/Blog" element={<Blog />} />
          <Route path="/BlogCategory" element={<BlogCategory />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          {/* Footer Elements */}
          <Route path="/Faq" element={<FAQ />} />
          <Route path="/Coupons" element={<Coupons />} />
          <Route path="/Careers" element={<Careers />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
        </Route>
        </Routes>
        
          </Router>
        </WishlistProvider>
      </CartProvider>
    </div>
  );
};

export default App;
