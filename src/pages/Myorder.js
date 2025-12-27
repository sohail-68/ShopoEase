// components/OrderHistory.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../features/order/orderSlice';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your orders...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center text-red-600">
        <p className="text-lg">Error: {error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 ">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl">📦</span>
            </div>
            <p className="text-gray-600 text-lg">No orders found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{order.totalPrice?.toLocaleString('en-IN')}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.isPaid 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.isPaid ? '✅ Paid' : '⏳ Pending'}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items with Product Details */}
                <div className="p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Order Items:</h4>
                  <div className="space-y-4">
                    {order.orderItems?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4 flex-1">
                          <img
                            src={`https://angular-server-mxyp.onrender.com${item.product?.images?.[0]}` || item.product?.image || "https://via.placeholder.com/80"}
                            alt={item.product?.name}
                            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                          />
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900">{item.product?.name}</h5>
                            <p className="text-gray-600 text-sm">
                              Quantity: {item.qty}
                            </p>
                            {item.product?.description && (
                              <p className="text-gray-500 text-sm mt-1">
                                {item.product.description}
                              </p>
                            )}
                            {/* Product Features */}
                            {item.product?.features && Object.keys(item.product.features).length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {Object.entries(item.product.features).map(([key, value]) => (
                                  <span key={key} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    {key}: {value}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            ₹{(item.price * item.qty).toLocaleString('en-IN')}
                          </p>
                          <p className="text-gray-600 text-sm">
                            ₹{item.price?.toLocaleString('en-IN')} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-3">Shipping Address:</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700">
                          {order.shippingAddress.address}<br/>
                          {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br/>
                          {order.shippingAddress.country}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Price Breakdown */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between text-gray-600 mb-2">
                      <span>Items Total:</span>
                      <span>₹{order.itemsPrice?.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 mb-2">
                      <span>Shipping:</span>
                      <span>{order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice?.toLocaleString('en-IN')}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 mb-2">
                      <span>Tax (10%):</span>
                      <span>₹{order.taxPrice?.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-2 mt-2">
                      <span>Total Amount:</span>
                      <span>₹{order.totalPrice?.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;