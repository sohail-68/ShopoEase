import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOrderDetails, markOrderAsPaid } from '../features/order/orderSlice';

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  console.log(orderId);
  
  const { currentOrder, loading, error } = useSelector((state) => state.order);
  const [markingPaid, setMarkingPaid] = useState(false);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [orderId, dispatch]);

  // Automatically mark as paid for COD or specific payment methods
  // useEffect(() => {
  //   if (currentOrder && !currentOrder.isPaid && currentOrder.paymentMethod === 'cod') {
  //     handleMarkAsPaid();
  //   }
  // }, [currentOrder]);

  // const handleMarkAsPaid = async () => {
  //   if (!currentOrder) return;
    
  //   setMarkingPaid(true);
  //   try {
  //     const paymentResult = {
  //       id: `manual_${Date.now()}`,
  //       status: 'completed',
  //       email_address: currentOrder.user?.email || 'customer@example.com',
  //       update_time: new Date().toISOString()
  //     };

  //     await dispatch(markOrderAsPaid({
  //       orderId: currentOrder._id,
  //     })).unwrap();
      
  //     alert('Order marked as paid successfully!');
  //   } catch (error) {
  //     alert(`Failed to mark order as paid: ${error}`);
  //   } finally {
  //     setMarkingPaid(false);
  //   }
  // };

  // const handlePaymentSuccess = async (paymentDetails) => {
  //   try {
  //     await dispatch(markOrderAsPaid({
  //       orderId: currentOrder._id,
  //       paymentResult: {
  //         id: paymentDetails.id,
  //         status: paymentDetails.status,
  //         email_address: paymentDetails.payer?.email_address,
  //         update_time: paymentDetails.update_time || new Date().toISOString()
  //       }
  //     })).unwrap();
      
  //     alert('Payment confirmed successfully!');
  //   } catch (error) {
  //     alert(`Payment confirmation failed: ${error}`);
  //   }
  // };
  console.log(currentOrder);
  

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl text-red-600">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Order</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
  <div className="container mx-auto">
    {/* Confetti-like Celebration Background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-20"></div>
      <div className="absolute top-20 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-green-400 rounded-full opacity-20"></div>
      <div className="absolute bottom-10 right-1/3 w-7 h-7 bg-purple-400 rounded-full opacity-20"></div>
    </div>

    {/* Success Header Card */}
    <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl shadow-2xl border border-emerald-200 p-8 sm:p-10 text-center mb-8 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-100 rounded-full translate-y-20 -translate-x-20 opacity-50"></div>
      
      <div className="relative">
        {/* Animated Check Icon */}
        <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-4xl text-white">✓</span>
          <div className="absolute inset-0 rounded-full animate-ping bg-emerald-400 opacity-30"></div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Order Confirmed!
          </span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-3 max-w-md mx-auto">
          Thank you for your purchase! Your order has been successfully placed.
        </p>
        
        {/* Order ID */}
        <div className="inline-flex items-center bg-gray-900 text-white px-4 py-2 rounded-full mb-6">
          <span className="text-sm opacity-80 mr-2">ORDER ID:</span>
          <span className="font-mono font-bold tracking-wider">
            #{currentOrder._id?.slice(-8).toUpperCase()}
          </span>
          <button 
            onClick={() => navigator.clipboard.writeText(currentOrder._id)}
            className="ml-2 text-gray-400 hover:text-white transition-colors"
            title="Copy Order ID"
          >
            📋
          </button>
        </div>

        {/* Status Timeline */}
     {/* Status Timeline */}
<div className="flex items-center justify-center space-x-4 mb-6">

  {/* 1️⃣ Ordered */}
  <div className="flex flex-col items-center">
    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md">
      1
    </div>
    <span className="text-xs font-medium mt-2 text-emerald-600">
      Ordered
    </span>
  </div>

  <div className={`w-12 h-1 ${
    currentOrder.isPaid ? "bg-emerald-300" : "bg-gray-200"
  }`} />

  {/* 2️⃣ Payment */}
  <div className="flex flex-col items-center">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md
        ${
          currentOrder.isPaid
            ? "bg-emerald-500 text-white"
            : "bg-gray-200 text-gray-400"
        }
      `}
    >
      2
    </div>

    <span
      className={`text-xs font-medium mt-2 ${
        currentOrder.isPaid
          ? "text-emerald-600"
          : "text-gray-400"
      }`}
    >
      Payment
    </span>
  </div>

  <div className={`w-12 h-1 ${
    currentOrder.status === "Shipped" ||
    currentOrder.status === "Delivered"
      ? "bg-emerald-300"
      : "bg-gray-200"
  }`} />

  {/* 3️⃣ Shipped */}
  <div className="flex flex-col items-center">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md
        ${
          currentOrder.status === "Shipped" ||
          currentOrder.status === "Delivered"
            ? "bg-emerald-500 text-white"
            : "bg-gray-200 text-gray-400"
        }
      `}
    >
      3
    </div>

    <span
      className={`text-xs font-medium mt-2 ${
        currentOrder.status === "Shipped" ||
        currentOrder.status === "Delivered"
          ? "text-emerald-600"
          : "text-gray-400"
      }`}
    >
      Shipped
    </span>
  </div>

  <div className={`w-12 h-1 ${
    currentOrder.status === "Delivered"
      ? "bg-emerald-300"
      : "bg-gray-200"
  }`} />

  {/* 4️⃣ Delivered */}
  <div className="flex flex-col items-center">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md
        ${
          currentOrder.status === "Delivered"
            ? "bg-emerald-500 text-white"
            : "bg-gray-200 text-gray-400"
        }
      `}
    >
      4
    </div>

    <span
      className={`text-xs font-medium mt-2 ${
        currentOrder.status === "Delivered"
          ? "text-emerald-600"
          : "text-gray-400"
      }`}
    >
      Delivered
    </span>
  </div>

</div>


        {/* Payment Status */}
        <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl mb-4 shadow-sm ${
          currentOrder.isPaid 
            ? 'bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200' 
            : 'bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200'
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            currentOrder.isPaid ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
          }`}>
            {currentOrder.isPaid ? '✅' : '⏳'}
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {currentOrder.isPaid ? 'Payment Confirmed' : 'Awaiting Payment'}
            </p>
            <p className="text-sm text-gray-600">
              {currentOrder.isPaid 
                ? `Paid via ${currentOrder.paymentMethod?.toUpperCase()} on ${new Date(currentOrder.paidAt).toLocaleDateString('en-IN')}`
                : 'Complete payment to proceed with shipping'}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Order Summary Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
          <div className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
            {currentOrder.orderItems?.length || 0} items
          </div>
        </div>
        
        {/* Order Items */}
        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
          {currentOrder.orderItems?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={`https://angular-server-mxyp.onrender.com${item.product?.images || item.product?.images?.[0]}` || "/placeholder.png"}
                    alt={item.product?.name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-sm"
                  />
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {item.qty}
                  </span>
                </div>
                <div className="max-w-[180px]">
                  <h4 className="font-semibold text-gray-900 truncate">{item.product?.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">₹{item.price?.toLocaleString('en-IN')} each</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 text-lg">
                  ₹{(item.price * item.qty).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 border-t border-gray-200 pt-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">₹{currentOrder.itemsPrice?.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className={`font-medium ${currentOrder.shippingPrice === 0 ? 'text-green-600' : 'text-gray-900'}`}>
              {currentOrder.shippingPrice === 0 ? 'FREE 🎉' : `₹${currentOrder.shippingPrice?.toLocaleString('en-IN')}`}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-medium text-gray-900">₹{currentOrder.taxPrice?.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-200 pt-4">
            <span>Total Amount</span>
            <span className="text-2xl text-blue-700">₹{currentOrder.totalPrice?.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Shipping & Payment Info Card */}
      <div className="space-y-6">
        {/* Shipping Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">📍</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Shipping Information</h2>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-gray-500 mt-1">📍</span>
                <div>
                  <p className="font-medium text-gray-900">Delivery Address</p>
                  <p className="text-gray-700 mt-1">
                    {currentOrder.shippingAddress?.address}<br/>
                    {currentOrder.shippingAddress?.city}, {currentOrder.shippingAddress?.postalCode}<br/>
                    {currentOrder.shippingAddress?.country}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-gray-500">📱</span>
                <div>
                  <p className="font-medium text-gray-900">Contact Details</p>
                  <p className="text-gray-700 mt-1">
                    {currentOrder.user?.email || 'Email not provided'}<br/>
                    {currentOrder.user?.phone || 'Phone not provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">💳</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-8 bg-white rounded shadow-sm flex items-center justify-center">
                  <span className="font-bold text-purple-600">
                    {currentOrder.paymentMethod?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 capitalize">{currentOrder.paymentMethod}</p>
                  <p className="text-sm text-gray-600">
                    {currentOrder.isPaid ? 'Payment Successful' : 'Payment Pending'}
                  </p>
                </div>
              </div>
            </div>
            
            {currentOrder.paidAt && (
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Transaction Date:</span>
                <span className="font-medium">{new Date(currentOrder.paidAt).toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Link
        to="/"
        className="group bg-white hover:bg-gray-50 text-gray-800 px-6 py-4 rounded-xl font-semibold transition-all duration-300 border border-gray-300 hover:border-gray-400 hover:shadow-lg text-center flex items-center justify-center space-x-2"
      >
        <span>←</span>
        <span>Continue Shopping</span>
      </Link>
      
      <Link
        to="/myorder"
        className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-center flex items-center justify-center space-x-2"
      >
        <span>📋</span>
        <span>View All Orders</span>
      </Link>

      {/* Mark as Paid Button (for testing/admin) */}
      {!currentOrder.isPaid && currentOrder.paymentMethod !== 'cod' && (
        <button
          // onClick={handleMarkAsPaid}
          disabled={markingPaid}
          className="group bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-center flex items-center justify-center space-x-2"
        >
          {markingPaid ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>💰</span>
              <span>Mark as Paid (Test)</span>
            </>
          )}
        </button>
      )}
    </div>

    {/* Additional Info & Help */}
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Order Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Order Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Order Confirmed</p>
              <p className="text-sm text-gray-600">{new Date(currentOrder.createdAt).toLocaleString('en-IN')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${currentOrder.isPaid ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Payment {currentOrder.isPaid ? 'Confirmed' : 'Pending'}</p>
              {currentOrder.paidAt && (
                <p className="text-sm text-gray-600">{new Date(currentOrder.paidAt).toLocaleString('en-IN')}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Processing Order</p>
              <p className="text-sm text-gray-600">Will update soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Need Help */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-2xl text-blue-600">❓</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">We're here to assist you with your order</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                <span>📧</span>
                <span>Email Support</span>
              </button>
              <button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                <span>💬</span>
                <span>Live Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Order Confirmation Note */}
    <div className="mt-8 text-center">
      <p className="text-gray-500 text-sm">
        📧 A confirmation email has been sent to <span className="font-semibold text-gray-700">
          {currentOrder.user?.email || 'your registered email'}
        </span>
      </p>
      <p className="text-gray-500 text-sm mt-2">
        Order placed on <span className="font-semibold text-gray-700">
          {new Date(currentOrder.createdAt).toLocaleString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </p>
    </div>
  </div>
</div>
  );
};

export default OrderSuccess;