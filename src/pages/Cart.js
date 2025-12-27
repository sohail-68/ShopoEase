import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, addToCart, removeFromCart, clearCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalQty, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (productId) => {
    dispatch(addToCart({ productId, qty: 1 }));
  };
  const navigate = useNavigate();

  const handleDecrease = (productId, currentQty) => {
    if (currentQty > 1) {
      dispatch(addToCart({ productId, qty: -1 }));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

const handleClearCart = () => {
  toast.promise(
    // Promise function
    new Promise((resolve, reject) => {
      toast(
        ({ id }) => (
          <div>
            <p>🛒 Are you sure you want to clear your entire cart?</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <button
                onClick={() => {
                  dispatch(clearCart())
                    .unwrap()
                    .then(() => {
                      toast.success("✅ Cart cleared successfully!");
                      resolve("success");
                      toast.dismiss(id); // Close the confirmation toast
                    })
                    .catch(() => {
                      toast.error("❌ Failed to clear cart");
                      reject("error");
                      toast.dismiss(id); // Close the confirmation toast
                    });
                }}
                style={{
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                YES
              </button>

              <button
                onClick={() => {
                  toast.dismiss(id); // Close the confirmation toast
                  reject("cancelled");
                }}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                NO
              </button>
            </div>
          </div>
        ),
        {
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          draggable: false,
        }
      );
    }),
    {
      loading: 'Processing...',
      success: null,
      error: null,
    }
  );
};



  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const totalPrice = items?.reduce(
    (sum, i) => sum + i.product.price * i.qty,
    0
  );

    const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };
  console.log(items);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">🛒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
<div className="py-10 bg-gradient-to-b from-gray-50 to-gray-100 
               ">
  <div className="container mx-auto">
    {/* Header with gradient */}
    <div className="mb-8 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xl">🛒</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="font-medium">{totalQty}</span>
            <span>{totalQty === 1 ? 'item' : 'items'}</span>
            <span className="text-gray-400">•</span>
            <span className="text-blue-600 font-semibold">₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
        
        <button 
          onClick={handleClearCart}
          disabled={loading}
          className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg disabled:shadow-none"
        >
          <span className="relative z-10 flex items-center gap-2">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Clearing...
              </>
            ) : (
              <>
                <span className="text-lg">🗑️</span>
                Clear Cart
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>

    {/* Main Content */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items - Left Column (2/3) */}
      <div className="lg:col-span-2 space-y-4">
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-4xl">🛒</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h3>
            <p className="text-gray-600 mb-8">Add some items to get started!</p>
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>←</span>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={item.product._id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-32 h-32 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                          src={`https://angular-server-mxyp.onrender.com${item.product.images[0]}` || "https://via.placeholder.com/100"}
                          alt={item.product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {item.qty > 1 && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                          ×{item.qty}
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-1">
                            {item.product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {item.product.description || "No description available"}
                          </p>
                          
                          {/* Price Display */}
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl font-bold text-gray-900">
                              ₹{item.product.price.toLocaleString()}
                            </span>
                            <span className="text-gray-500">/each</span>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900 mb-1">
                            ₹{(item.product.price * item.qty).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.qty} × ₹{item.product.price.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Controls Row */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600 text-sm font-medium">Quantity:</span>
                          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-2 py-1">
                            <button
                              onClick={() => handleDecrease(item.product._id, item.qty)}
                              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 text-gray-700 font-medium shadow-sm"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="min-w-12 text-center font-bold text-gray-900 text-lg px-2">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => handleIncrease(item.product._id)}
                              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 text-gray-700 font-medium shadow-sm"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.product._id)}
                          className="group/remove flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-red-50"
                        >
                          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 group-hover/remove:bg-red-100 transition-colors duration-200">
                            ×
                          </span>
                          <span className="text-sm font-medium">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary - Right Column (1/3) */}
      <div className="lg:col-span-1">
        <div className="sticky top-8">
          <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Summary Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>📋</span>
                Order Summary
              </h2>
            </div>

            {/* Summary Content */}
            <div className="p-6 space-y-6">
              {/* Items Breakdown */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalQty} items)</span>
                  <span className="font-semibold text-gray-900">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold text-gray-900">Calculated at checkout</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Inclusive of all taxes</div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                  className="group relative w-full bg-gradient-to-r from-gray-900 to-gray-700  disabled:from-gray-300 disabled:to-gray-400 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="text-xl">🔒</span>
                    Proceed to Checkout
                    <span className="text-xl">→</span>
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>

                {/* Continue Shopping */}
                <button 
                  onClick={() => window.history.back()}
                  className="w-full mt-4 bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 text-gray-800 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>←</span>
                  Continue Shopping
                </button>
              </div>

          

              {/* Promo Code */}
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Cart;