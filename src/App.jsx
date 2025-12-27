import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout.jsx";
import "./index.css";
import AdminLayout from "./layouts/Adminlayout.js";
import { Toaster } from 'react-hot-toast';
import Whishlist from "./pages/Whishlist.jsx";

const HomaPage = React.lazy(() => import("./pages/HomaPage.js"));
const Profile = React.lazy(() => import("./pages/Profile.js"));
const Home = React.lazy(() => import("./pages/Home.jsx"));
const Wishlist = React.lazy(() => import("./pages/Whishlist.jsx"));
const Result = React.lazy(() => import("./pages/Result.js"));
const Productdetails = React.lazy(() => import("./pages/Productdetails.js"));
const Cart = React.lazy(() => import("./pages/Cart.js"));
const Checkout = React.lazy(() => import("./pages/Checkout.js"));
const OrderSucess = React.lazy(() => import("./pages/Order.js"));
const Myorder = React.lazy(() => import("./pages/Myorder.js"));
const Login = React.lazy(() => import("./pages/Login.js"));
const Signup = React.lazy(() => import("./pages/Signup.js"));

function App() {
  return (
    <>
      {/* Toast Notifications Container */}
      <Toaster 
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Default options for all toasts
          className: '',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          
          // Success toast options
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
            style: {
              background: '#10b981',
              color: 'white',
              fontWeight: '500',
              fontSize: '14px',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#10b981',
            },
          },
          
          // Error toast options
          error: {
            duration: 4000,
            style: {
              background: '#ef4444',
              color: 'white',
              fontWeight: '500',
              fontSize: '14px',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#ef4444',
            },
          },
          
          // Loading toast options
          loading: {
            duration: Infinity,
            style: {
              background: '#3b82f6',
              color: 'white',
              fontWeight: '500',
              fontSize: '14px',
            },
          },
        }}
      />
      
      <Router>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            {/* 
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route path="" element={<Menu />} />
              <Route path="users" element={<Users />} />
              <Route path="slider" element={<Slider />} />
              <Route path="media" element={<Media />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogDetail />} />
              <Route path="getblog" element={<GetBlog />} />
              <Route path="campaign" element={<Campaign />} />
              <Route path="getcampign" element={<GetCampaign />} />
              <Route path="team" element={<Team />} />
              <Route path="teammember" element={<TeamMember />} />
              <Route path="campaign/:id" element={<CampaignDetails />} />
              <Route path="pages" element={<CreatePage />} />
              <Route path="getpages/:id" element={<GetPages />} />
              <Route path="allpages" element={<Allpages />} />
              <Route path="home" element={<HomeContentCrud />} />
              <Route path="profile" element={<Profile />} />
              <Route path="submenu/:id" element={<SubMenu />} />
              <Route path="submenuPage/:id" element={<SubmenuPage />} />
            </Route>
            */}

            {/* Main App Protected Routes */}
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="/" element={<HomaPage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="wishlist" element={<Whishlist />} />
              <Route path="product" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success/:orderId" element={<OrderSucess />} />
              <Route path="/myorder" element={<Myorder />} />
              <Route path="results" element={<Result />} />
              <Route path="productDetails/:id" element={<Productdetails />} />
              <Route path="cart" element={<Cart />} />
            </Route>

            {/* Catch all route - redirect to home or login based on auth */}
            <Route path="*" element={
              localStorage.getItem('token') ? 
                <HomaPage /> : 
                <Login />
            } />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;