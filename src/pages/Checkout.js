// Checkout.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../features/order/orderSlice';
import { clearCart } from '../features/cartSlice';
import { log } from 'three/src/utils.js';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalQty } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.order);

  const user = JSON.parse(localStorage.getItem("user"));

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("razorpay"); // default

  const itemsPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );
  const taxPrice = Number((itemsPrice * 0.1).toFixed(2));
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = Number((itemsPrice + taxPrice + shippingPrice).toFixed(2));

  const handlePlaceOrder = async () => {
    if (
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      alert("Please fill all shipping address fields");
      return;
    }

    try {
      const orderData = {
        orderItems: items.map((item) => ({
          product: item.product._id,
          name: item.product.name,
          qty: item.qty,
          price: item.product.price
        })),
        shippingAddress,
        paymentMethod
      };
      console.log(orderData);
      

      const result = await dispatch(createOrder(orderData)).unwrap();
      const { order, razorpayOrder } = result;
console.log(result);

      // ================= COD FLOW =================
      if (paymentMethod === "cod") {
        dispatch(clearCart());
                  navigate(`/order-success/${order._id}`);

        return;
      }

      // ================= RAZORPAY FLOW =================
      // const options = {
      //   key: "rzp_test_pVQpC22qnKIhBQ",
      //   amount: razorpayOrder.amount,
      //   currency: "INR",
      //   name: "My Shop",
      //   description: "Order Payment",
      //   order_id: razorpayOrder.id,

      //   handler: async function (response) {
      //     const verifyRes = await fetch(
      //       "https://angular-server-mxyp.onrender.com/api/orders/verify",
      //       {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify({
      //           orderId: order._id,
      //           razorpay_order_id: response.razorpay_order_id,
      //           razorpay_payment_id: response.razorpay_payment_id,
      //           razorpay_signature: response.razorpay_signature,
      //           paidBy: {
      //             name: user?.name,
      //             email: user?.email,
      //             phone: user?.phone
      //           }
      //         })
      //       }
      //     );

      //     const data = await verifyRes.json();
      //     if (data.success) {
      //       dispatch(clearCart());
      //       navigate(`/order-success/${order._id}`);
      //     } else {
      //       alert("Payment verification failed");
      //     }
      //   },

      //   prefill: {
      //     name: user?.name,
      //     email: user?.email,
      //     contact: user?.phone
      //   },

      //   theme: { color: "#3399cc" }
      // };

      // new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  if (!items || items.length === 0) {
    return <h2 className="text-center mt-10">Your cart is empty</h2>;
  }


  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
  <div className="max-w-7xl mx-auto ">
    {/* Header with Progress Indicator */}
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Complete Your Order
          </h1>
          <p className="text-gray-600 mt-2">Just a few steps to complete your purchase</p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">Secure Checkout</span>
        </div>
      </div>

     
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Shipping & Payment */}
      <div className="space-y-6">
        {/* Shipping Address Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600">📍</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
                  <p className="text-sm text-gray-600">Where should we deliver your order?</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                <span>Address</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200"
                  placeholder="Enter your full address"
                  required
                />
                <div className="absolute left-3 top-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200"
                  placeholder="Enter city"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200"
                  placeholder="Postal code"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Country</label>
              <div className="relative">
                <select
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm appearance-none bg-white"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="IN">India</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                </select>
                <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
  <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
        <span className="text-green-600">💳</span>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
        <p className="text-sm text-gray-600">How would you like to pay?</p>
      </div>
    </div>
  </div>

  <div className="p-6 space-y-4">

    {/* Razorpay Option */}
    <label
      className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all
      ${paymentMethod === 'razorpay'
        ? 'border-blue-500 bg-blue-50'
        : 'border-gray-200 hover:border-blue-300'}`}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${paymentMethod === 'razorpay'
            ? 'border-blue-500 bg-blue-500'
            : 'border-gray-300'}`}
        >
          {paymentMethod === 'razorpay' && (
            <div className="w-2 h-2 bg-white rounded-full"></div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-8 bg-blue-100 rounded flex items-center justify-center">
            <span className="font-bold text-blue-700">RZP</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Online Payment</p>
            <p className="text-sm text-gray-600">UPI / Card / NetBanking (Razorpay)</p>
          </div>
        </div>
      </div>

      <input
        type="radio"
        name="payment"
        value="razorpay"
        checked={paymentMethod === 'razorpay'}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="sr-only"
      />
      <span className="text-blue-600">→</span>
    </label>

    {/* COD Option */}
    <label
      className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all
      ${paymentMethod === 'cod'
        ? 'border-blue-500 bg-blue-50'
        : 'border-gray-200 hover:border-blue-300'}`}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${paymentMethod === 'cod'
            ? 'border-blue-500 bg-blue-500'
            : 'border-gray-300'}`}
        >
          {paymentMethod === 'cod' && (
            <div className="w-2 h-2 bg-white rounded-full"></div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-8 bg-yellow-100 rounded flex items-center justify-center">
            <span className="font-bold text-yellow-700">₹</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Cash on Delivery</p>
            <p className="text-sm text-gray-600">Pay when order is delivered</p>
          </div>
        </div>
      </div>

      <input
        type="radio"
        name="payment"
        value="cod"
        checked={paymentMethod === 'cod'}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="sr-only"
      />
      <span className="text-blue-600">→</span>
    </label>

  </div>
</div>

      </div>

      {/* Right Column - Order Summary */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-6">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600">📦</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                <p className="text-sm text-gray-600">{items.length} items in your order</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {/* Order Items */}
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.product._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={`https://angular-server-mxyp.onrender.com${item.product.images[0]}`}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                      />
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                        {item.qty}
                      </span>
                    </div>
                    <div className="max-w-[180px]">
                      <p className="font-semibold text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-sm text-gray-600 mt-1">₹{item.product.price.toLocaleString()} each</p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-900 text-lg">
                    ₹{(item.product.price * item.qty).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalQty} items)</span>
                <span className="font-medium text-gray-900">₹{itemsPrice.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className={`font-medium ${shippingPrice === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                  {shippingPrice === 0 ? 'FREE 🎉' : `₹${shippingPrice}`}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-medium text-gray-900">₹{taxPrice.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-200 pt-4">
                <span>Total Amount</span>
                <span className="text-2xl text-blue-700">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Promo Code (Optional) */}
            

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Processing Your Order...
                </>
              ) : (
                <>
                  <span>Place Order</span>
                  <span className="ml-2">•</span>
                  <span className="ml-2">₹{totalPrice.toLocaleString()}</span>
                  <span className="ml-3">→</span>
                </>
              )}
            </button>

            {/* Security & Trust Signals */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span>🔒</span>
                  </div>
                  <span className="text-sm">256-bit SSL Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span>🛡️</span>
                  </div>
                  <span className="text-sm">Money Back Guarantee</span>
                </div>
              </div>
              
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  By placing your order, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Need Help Section */}
        <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">❓</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-3">Our customer support team is available 24/7</p>
              <div className="flex items-center space-x-4">
                <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                  <span>📞</span>
                  <span className="ml-2">Call Us</span>
                </button>
                <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                  <span>💬</span>
                  <span className="ml-2">Live Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Checkout;