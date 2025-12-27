// src/pages/Wishlist.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetWishlist, RemoveFromWishlist } from '../services/wishlistApi';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch wishlist data
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await GetWishlist();
      
      if (response.data.success) {
        setWishlistItems(response.data.data.products || []);
      } else {
        setError(response.data.message || 'Failed to load wishlist');
        toast.error(response.data.message || 'Failed to load wishlist');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch wishlist');
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  // Remove item from wishlist
  const handleRemoveItem = async (productId, e) => {
    e.stopPropagation();
    
    try {
      const response = await RemoveFromWishlist(productId);
      
      if (response.data.success) {
        // Update local state
        setWishlistItems(prev => prev.filter(item => item._id !== productId));
        toast.success('Removed from wishlist');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove item');
    }
  };

  // Clear all items
const handleClearAll = async () => {
  if (wishlistItems.length === 0) {
    toast('Your wishlist is already empty', {
      icon: '📝',
      duration: 3000,
      style: {
        fontSize: '16px',
        padding: '16px 24px',
      }
    });
    return;
  }

  // Large confirmation toast
  toast((t) => (
    <div className="flex flex-col space-y-4 p-4 min-w-[350px] max-w-[450px]">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Clear Wishlist</h3>
          <p className="text-base text-gray-600 mt-1">
            Remove all {wishlistItems.length} items?
          </p>
        </div>
      </div>

      {/* Warning Message */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="ml-2 text-sm text-yellow-700">
            This action cannot be undone. All items will be permanently removed from your wishlist.
          </p>
        </div>
      </div>

      {/* Progress Info (if many items) */}
      {wishlistItems.length > 10 && (
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center text-sm text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            This may take a moment as you have {wishlistItems.length} items
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex-1 py-3 px-4 bg-gray-200 text-gray-800 text-base font-medium rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            toast.dismiss(t.id);
            
            // Show large loading toast
            const loadingToast = toast.loading(
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-medium text-lg text-gray-800">Clearing Wishlist</p>
                  <p className="text-gray-600 mt-1">Removing {wishlistItems.length} items...</p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse w-1/2"></div>
                  </div>
                </div>
              </div>, 
              {
                duration: Infinity,
                style: {
                  minWidth: '350px',
                  padding: '24px',
                }
              }
            );
            
            try {
              // Track progress
              let completed = 0;
              const totalItems = wishlistItems.length;
              
              // Remove items with progress updates
              for (const item of wishlistItems) {
                await RemoveFromWishlist(item._id);
                completed++;
                
                // Update progress every few items

                const progress = Math.round((completed / totalItems) * 100);


                  console.log(completed);
                  
                  toast.loading(
                    <div className="flex flex-col items-center">
                      <div className="mb-2">
                        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-lg text-gray-800">Clearing Wishlist</p>
                        <p className="text-gray-600 mt-1">
                          Removed {completed} of {totalItems} items ({progress}%)
                        </p>
                        <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>, 
                    { id: loadingToast }
                  );
              }
              
              setWishlistItems([]);
              
              // Show large success toast
              toast.success(
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Wishlist Cleared!</h3>
                  <p className="text-gray-600 mt-2">
                    Successfully removed {totalItems} items from your wishlist
                  </p>
                  <button
                    onClick={() => toast.dismiss()}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    OK
                  </button>
                </div>,
                {
                  id: loadingToast,
                  duration: 5000,
                  style: {
                    minWidth: '350px',
                    padding: '24px',
                  }
                }
              );
              
            } catch (error) {
              console.error('Error clearing wishlist:', error);
              
              // Show large error toast
              toast.error(
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Failed to Clear</h3>
                  <p className="text-gray-600 mt-2">
                    {error.response?.data?.message || 'An error occurred while clearing your wishlist'}
                  </p>
                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={() => toast.dismiss()}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => {
                        toast.dismiss();
                        handleClearAll(); // Retry
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Try Again
                    </button>
                  </div>
                </div>,
                {
                  id: loadingToast,
                  duration: 6000,
                  style: {
                    minWidth: '350px',
                    padding: '24px',
                  }
                }
              );
            }
          }}
          className="flex-1 py-3 px-4 bg-red-600 text-white text-base font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Clear All Items
        </button>
      </div>
    </div>
  ), {
    duration: 15000, // Keep open for 15 seconds
    style: {
      minWidth: '350px',
      maxWidth: '450px',
      fontSize: '16px',
    }
  });
};

  // Navigate to product details
  const handleProductClick = (productId) => {
    navigate(`/productDetails/${productId}`);
  };

  // Navigate to shop
  const handleContinueShopping = () => {
    navigate('/product');
  };

  // Initial load
  useEffect(() => {
    fetchWishlist();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Unable to load wishlist</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchWishlist}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  console.log(wishlistItems);
  
  return (
    <div className="py-10 bg-gradient-to-b from-gray-50 to-gray-100 ">
  <div className="container mx-auto">
    {/* Header Section */}
    <div className="mb-8 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center shadow-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-7 w-7 text-white" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                My Wishlist
              </h1>
              <p className="text-gray-600 mt-1">
                Your curated collection of favorites
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center py-1 gap-4 lg:flex-row text-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-pink-50 to-red-50 rounded-full border border-pink-100">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500"></span>
              <span className="font-medium text-gray-700">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Saved for 60 days</span>
            </div>
          </div>
        </div>

        {wishlistItems.length > 0 && (
          <div className="flex  justify-center items-center gap-3">
            <button
              onClick={handleClearAll}
              className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Clear All
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={handleContinueShopping}
              className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
              Add More
            </button>
          </div>
        )}
      </div>

      {/* Stats Bar */}
      {wishlistItems.length > 0 && (
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
            <div className="text-sm text-blue-700 font-medium mb-1">Total Value</div>
            <div className="text-2xl font-bold text-gray-900">
              ₹{wishlistItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
            <div className="text-sm text-green-700 font-medium mb-1">Avg. Rating</div>
            <div className="text-2xl font-bold text-gray-900">
              {wishlistItems.length > 0 
                ? (wishlistItems.reduce((sum, item) => sum + item.rating, 0) / wishlistItems.length).toFixed(1)
                : '0.0'
              }
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
            <div className="text-sm text-purple-700 font-medium mb-1">Categories</div>
            <div className="text-2xl font-bold text-gray-900">
              {new Set(wishlistItems.map(item => item.category)).size}
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200 rounded-xl p-4">
            <div className="text-sm text-pink-700 font-medium mb-1">Recently Added</div>
            <div className="text-2xl font-bold text-gray-900">
              {wishlistItems.filter(item => {
                const daysAgo = (new Date() - new Date(item.addedAt)) / (1000 * 3600 * 24);
                return daysAgo < 7;
              }).length}
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Wishlist Items */}
    {wishlistItems.length > 0 ? (
      <>
       

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <img
                  src={`https://angular-server-mxyp.onrender.com${item.images?.[0]}` || "/placeholder-image.jpg"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Quick Actions */}
               

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-5">
                {/* Brand and Name */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                      {item.brand}
                    </span>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">
                        {item.rating || 'New'}
                      </span>
                    </div>
                  </div>
                  <h3 
                    onClick={() => handleProductClick(item._id)}
                    className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {item.name}
                  </h3>
                </div>

                {/* Price and Added Date */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{item.price.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Added {new Date(item.addedAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleProductClick(item._id)}
                    className="lg:py-3 lg:px-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>View Details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => handleRemoveItem(item._id, e)}
                    className="py-3 px-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 hover:border-red-300 text-red-600 hover:text-red-700 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    ) : (
      // Empty Wishlist State
      <div className="max-w-2xl mx-auto text-center py-16 px-4">
        <div className="relative mx-auto w-64 h-64 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full blur-2xl"></div>
          <div className="relative w-full h-full flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-48 w-48 text-gray-300"
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={0.5} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your wishlist is waiting
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Save products you love for later. When you find something you like, click the heart icon to add it here.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleContinueShopping}
            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
            Start Shopping
          </button>
          
          <button
            onClick={() => {/* Browse popular items */}}
            className="px-8 py-4 bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 rounded-xl font-medium text-lg transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Browse Popular
          </button>
        </div>
      </div>
    )}

    {/* Footer Section */}
    {wishlistItems.length > 0 && (
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Price Alerts</h4>
              <p className="text-gray-600 text-sm">We'll notify you if prices drop on any items in your wishlist.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Stock Notifications</h4>
              <p className="text-gray-600 text-sm">Get alerts when out-of-stock items become available again.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Share List</h4>
              <p className="text-gray-600 text-sm">Share your wishlist with friends and family for special occasions.</p>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default Wishlist;