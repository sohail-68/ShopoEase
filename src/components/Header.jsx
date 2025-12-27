// src/components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { FiSearch, FiHeart, FiUser, FiMenu, FiX, FiShoppingCart, FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/cartSlice";
import { fetchSuggestions } from "../features/searchSlice";
import { useLoader } from "@react-three/fiber";
import { logout } from "../features/auth/authSlice";
import { 
  FiSearch, 
  FiUser, 
  FiHeart, 
  FiShoppingCart, 
  FiMenu, 
  FiX,
  FiHome,
  FiPackage,
  FiTag,
  FiShoppingBag,
  FiLogOut,
  FiUser as FiUserIcon,
  FiChevronRight,
  FiSettings,
  FiHelpCircle,
  FiSun,
  FiLogIn,
  FiChevronDown
} from 'react-icons/fi';
// import { fetchCart, logout, fetchSuggestions } from '../redux/actions';

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const totalQty = useSelector((state) => state.cart.totalQty);
  const {orders} = useSelector((state) => state.order);
  console.log(orders);
  
  const { suggestions, loading } = useSelector((state) => state.search);
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
  console.log(user);
  
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) && 
          mobileOpen) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch cart on mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Search suggestions with debounce
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const timer = setTimeout(() => {
        dispatch(fetchSuggestions(searchQuery));
        setShowSuggestions(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/results?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setSearchQuery("");
      setIsMobileSearchOpen(false);
      setMobileOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const searchTerm = suggestion.name || suggestion.brand || suggestion.category;
    navigate(`/results?q=${encodeURIComponent(searchTerm)}`);
    setSearchQuery("");
    setShowSuggestions(false);
    setIsMobileSearchOpen(false);
    setMobileOpen(false);
  };

  const handleInputFocus = () => {
    if (searchQuery.length > 1 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
    if (isMobileSearchOpen) setIsMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (mobileOpen) setMobileOpen(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setMobileOpen(false);
  };

  const menuItems = [
    { icon: <FiShoppingBag />, label: 'My Orders', path: '/myorder', mobile: true, desktop: false },
    { icon: <FiHeart />, label: 'Wishlist', path: '/wishlist', mobile: true, desktop: false },
  ];

  return (
    <>
      {/* 🔹 Top Announcement Bar */}
      <div className="bg-[#f5f5f5] py-1.5 px-4 text-center text-sm text-gray-600 border-b">
        <p className="truncate px-2">🛵 Free delivery on orders above ₹499 | 🎁 Special discounts!</p>
      </div>

    <header
  className={`bg-white z-50 transition-all duration-300 ${
    scroll 
      ? "fixed top-0 left-0 right-0 shadow-xl backdrop-blur-sm bg-white/95 border-b border-gray-100" 
      : "sticky top-0 border-b border-gray-200 bg-white"
  }`}
>
  <div className="container mx-auto px-4 md:px-6">
    <div className="flex items-center justify-between h-16 md:h-20">
      
      {/* 🔹 LEFT: Mobile Menu Button & Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span className={`absolute left-0 top-0 w-6 h-0.5 bg-gray-700 transition-all ${
              mobileOpen ? 'rotate-45 top-2' : ''
            }`}></span>
            <span className={`absolute left-0 top-2 w-6 h-0.5 bg-gray-700 transition-all ${
              mobileOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`absolute left-0 top-4 w-6 h-0.5 bg-gray-700 transition-all ${
              mobileOpen ? '-rotate-45 top-2' : ''
            }`}></span>
          </div>
        </button>
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow">
              <span className="text-white font-bold text-lg">SE</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              ShopEase
            </h1>
            <p className="text-xs text-gray-500 -mt-1">Premium Shopping</p>
          </div>
        </div>
      </div>

      {/* 🔹 CENTER: Desktop Search Bar */}
      <div className="hidden lg:flex flex-1 max-w-2xl mx-6 lg:mx-8 relative" ref={searchRef}>
        <form onSubmit={handleSearch} className="relative w-full group">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleInputFocus}
              className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:bg-white group-hover:shadow-sm text-sm placeholder-gray-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-r-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-md shadow-blue-500/20"
            >
              Search
            </button>
          </div>
        </form>

        {/* Enhanced Search Suggestions */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-40 animate-fadeIn">
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-gray-600 font-medium">Searching products...</p>
                </div>
              ) : suggestions.length > 0 ? (
                <>
                  <div className="px-5 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FiSearch className="text-gray-400" />
                        <span className="text-sm font-semibold text-gray-700">
                          Results for "{searchQuery}"
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                        {suggestions.length} found
                      </span>
                    </div>
                  </div>
                  
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion._id || index}
                      className="px-5 py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition-all duration-200 group"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {suggestion.images?.[0] ? (
                            <img 
                              src={`https://angular-server-mxyp.onrender.com${suggestion.images[0]}`} 
                              alt={suggestion.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                              <FiPackage className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-700 line-clamp-1">
                              {suggestion.name}
                            </h4>
                            {suggestion.price && (
                              <div className="text-sm font-bold text-green-600 flex-shrink-0">
                                ₹{suggestion.price.toLocaleString()}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3 mt-1">
                            {suggestion.brand && (
                              <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-medium">
                                {suggestion.brand}
                              </span>
                            )}
                            {suggestion.category && (
                              <span className="text-xs text-gray-500">
                                in {suggestion.category}
                              </span>
                            )}
                          </div>
                          
                          {suggestion.rating > 0 && (
                            <div className="flex items-center gap-1 mt-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(suggestion.rating)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs text-gray-600 font-medium">
                                {suggestion.rating}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({suggestion.numReviews || 0} reviews)
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <FiChevronRight className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : searchQuery.length > 1 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <FiSearch className="text-2xl text-gray-400" />
                  </div>
                  <p className="text-gray-700 font-medium mb-1">No products found</p>
                  <p className="text-sm text-gray-500">Try different keywords or browse categories</p>
                  <button 
                    onClick={() => navigate('/results?category=all')}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:from-blue-100 hover:to-blue-200 transition-all"
                  >
                    Browse All Products
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {/* 🔹 RIGHT: User Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Mobile Search Button */}
        <button
          onClick={toggleMobileSearch}
          className="lg:hidden p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors relative"
        >
          <FiSearch className="text-xl text-gray-700" />
        </button>

        {/* Desktop Wishlist */}
        <button 
          className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors group"
          onClick={() => navigate("/wishlist")}
        >
          <div className="relative">
            <FiHeart className="text-xl text-gray-700 group-hover:text-red-500 transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </div>
          <span className="font-medium text-gray-700 group-hover:text-gray-900">Wishlist</span>
        </button>

        {/* Desktop Orders */}
        {isAuthenticated && (
          <button 
            className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors group"
            onClick={() => navigate('/myorder')}
          >
            <div className="relative">
              <FiPackage className="text-xl text-gray-700 group-hover:text-blue-600 transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <span className="font-medium text-gray-700 group-hover:text-gray-900">Orders</span>
          </button>
        )}

        {/* Cart Button */}
        {location.pathname !== "/cart" && (
          <button 
            onClick={() => navigate("/cart")}
            className="relative p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors group"
          >
            <div className="relative">
              <FiShoppingCart className="text-xl text-gray-700 group-hover:text-blue-600 transition-colors" />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-3 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                  {totalQty > 99 ? '99+' : totalQty}
                </span>
              )}
            </div>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Cart
            </span>
          </button>
        )}

        {/* User Profile */}
        {isAuthenticated ? (
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="text-left hidden xl:block">
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    {user?.name?.split(' ')[0] || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">My Account</p>
                </div>
              </button>
              
              {/* User Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <button 
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                    <FiUser className="text-gray-500" />
                    <span>My Profile</span>
                  </button>
                  <button 
                    onClick={() => navigate('/myorder')}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                    <FiPackage className="text-gray-500" />
                    <span>My Orders</span>
                  </button>
                  <button 
                    onClick={() => navigate('/wishlist')}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                    <FiHeart className="text-gray-500" />
                    <span>Wishlist</span>
                  </button>
                </div>
                
                <div className="p-2 border-t">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-50 text-red-600 font-medium"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => navigate("/login")}
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md shadow-blue-500/20 active:shadow-sm"
          >
            <FiLogIn className="text-lg" />
            <span className="font-semibold">Sign In</span>
          </button>
        )}

    
      </div>
    </div>

    {/* 🔹 Mobile Search Bar (when toggled) */}
    {isMobileSearchOpen && (
      <div className="lg:hidden mb-4 mt-2" ref={searchRef}>
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleInputFocus}
              className="w-full pl-12 pr-24 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-20 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-r-xl font-medium"
            >
              Go
            </button>
          </div>
        </form>

        {/* Mobile Search Suggestions */}
        {showSuggestions && (
          <div className="absolute left-4 right-4 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-80 overflow-y-auto z-40">
            {loading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-sm text-gray-600 mt-2">Searching...</p>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-500">
                  TOP RESULTS
                </div>
                {suggestions.slice(0, 5).map((suggestion, index) => (
                  <button
                    key={suggestion._id || index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 active:bg-gray-100 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      {suggestion.images?.[0] && (
                        <img 
                          src={`https://angular-server-mxyp.onrender.com${suggestion.images[0]}`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {suggestion.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {suggestion.brand} • {suggestion.category}
                      </p>
                    </div>
                    <div className="text-sm font-semibold text-green-600">
                      ₹{suggestion.price?.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            ) : searchQuery.length > 1 ? (
              <div className="p-6 text-center">
                <FiSearch className="text-3xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">No results found</p>
                <p className="text-sm text-gray-500 mt-1">Try different keywords</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    )}
  </div>

  {/* 🔹 Mobile Menu Overlay */}
  {mobileOpen && (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
        onClick={toggleMobileMenu}
      />
      
      {/* Menu Panel */}
      <div 
        ref={mobileMenuRef}
        className="fixed top-0 left-0 w-80 h-full bg-gradient-to-b from-white to-gray-50 shadow-2xl z-50 transform transition-transform duration-300 ease-out overflow-y-auto lg:hidden"
      >
        {/* Menu Header */}
        <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <FiUser className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {isAuthenticated ? (user?.name || 'Welcome back!') : 'Welcome!'}
                </h3>
                {isAuthenticated && (
                  <p className="text-sm opacity-90">{user?.email}</p>
                )}
              </div>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-90 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Account active
              </span>
              <button 
                onClick={handleLogout}
                className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
              >
                <FiLogOut className="text-sm" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  navigate('/login');
                  setMobileOpen(false);
                }}
                className="flex-1 bg-white text-blue-600 py-3 rounded-xl text-sm font-semibold hover:bg-gray-100 active:bg-gray-200"
              >
                Login
              </button>
              <button 
                onClick={() => {
                  navigate('/register');
                  setMobileOpen(false);
                }}
                className="flex-1 border-2 border-white text-white py-3 rounded-xl text-sm font-semibold hover:bg-white/10"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {isAuthenticated && (
          <div className="px-6 py-4 bg-white border-b">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <p className="text-2xl font-bold text-blue-700">{totalQty}</p>
                <p className="text-xs text-blue-600 font-medium">In Cart</p>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl">
                <p className="text-2xl font-bold text-green-700">{orders.length}</p>
                <p className="text-xs text-green-600 font-medium">Orders</p>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="p-4">
          <h4 className="font-semibold text-gray-500 text-xs uppercase tracking-wider mb-3 px-2">
            Navigation
          </h4>
          <div className="space-y-1">
            {[
              { icon: <FiHome />, label: 'Home', path: '/' },
              { icon: <FiShoppingBag />, label: 'Shop', path: '/results' },
              { icon: <FiPackage />, label: 'Orders', path: '/myorder', auth: true },
              { icon: <FiHeart />, label: 'Wishlist', path: '/wishlist' },
              { icon: <FiHelpCircle />, label: 'Help & Support', path: '/help' },
            ].map((item) => {
              if (item.auth && !isAuthenticated) return null;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center gap-4 w-full p-3 rounded-xl text-left transition-all ${
                    location.pathname === item.path 
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className={`text-xl ${
                    location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Cart Section */}
          <div className="mt-6">
            <button
              onClick={() => {
                navigate('/cart');
                setMobileOpen(false);
              }}
              className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <FiShoppingCart className="text-xl" />
                  {totalQty > 0 && (
                    <span className="absolute -top-2 -right-5 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {totalQty}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold">My Cart</p>
                  <p className="text-sm opacity-90">View items in cart</p>
                </div>
              </div>
              <FiChevronRight className="text-xl opacity-70" />
            </button>
          </div>

          {/* Categories Section */}
          <div className="mt-8 px-2">
            <h4 className="font-semibold text-gray-500 text-xs uppercase tracking-wider mb-3">
              Shop Categories
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Electronics', icon: '📱', color: 'from-blue-500 to-blue-600' },
                { name: 'Fashion', icon: '👕', color: 'from-pink-500 to-rose-600' },
                { name: 'Home', icon: '🏠', color: 'from-emerald-500 to-green-600' },
                { name: 'Beauty', icon: '💄', color: 'from-purple-500 to-violet-600' },
                { name: 'Sports', icon: '⚽', color: 'from-orange-500 to-amber-600' },
                { name: 'Books', icon: '📚', color: 'from-indigo-500 to-purple-600' },
              ].map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    navigate(`/results?category=${cat.name}`);
                    setMobileOpen(false);
                  }}
                  className="p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md transition-all text-left"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-lg mb-2`}>
                    {cat.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-around">
              <a href="/help" className="text-xs text-gray-600 hover:text-blue-600">Help</a>
              <a href="/about" className="text-xs text-gray-600 hover:text-blue-600">About</a>
              <a href="/privacy" className="text-xs text-gray-600 hover:text-blue-600">Privacy</a>
              <a href="/terms" className="text-xs text-gray-600 hover:text-blue-600">Terms</a>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">
              © 2024 ShopEase. Made with ❤️
            </p>
          </div>
        </div>
      </div>
    </>
  )}
</header>
      {/* Spacer when header is fixed */}
      {scroll && <div className="h-16 sm:h-20"></div>}
    </>
  );
};

export default Header;
