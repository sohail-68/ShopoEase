// import React, { useState, useEffect } from 'react';
// import { getProducts } from '../services/ProductsApi';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     pages: 1,
//     total: 0
//   });
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch products on component mount and when page changes
//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   const fetchProducts = async (page = 4) => {
//     try {
//       setLoading(true);
//       setError('');
      
//       // Set limit=1 to show only one product per page
//       const query = `page=${page}&limit=4`;
      
//       // Fetch products from API
//       const response = await getProducts(query);
      
//       // Set products array from response
//       setProducts(response.products || []);
      
//       // Set pagination info
//       setPagination({
//         page: response.page || 1,
//         pages: response.pages || 1,
//         total: response.total || 0
//       });
      
//     } catch (err) {
//       setError('Product fetch करने में error आया');
//       console.error('Error fetching product:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.pages) {
//       setCurrentPage(newPage);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-lg">Loading product...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-red-500 text-lg">{error}</div>
//         <button 
//           onClick={() => fetchProducts(currentPage)}
//           className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }
//   console.log(pagination);
  

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      
//       {/* Pagination Info */}
//       <div className="flex justify-between items-center mb-6 bg-blue-50 p-4 rounded-lg">
//         <div className="text-lg font-semibold text-blue-800">
//           Product {currentPage} of {pagination.total}
//         </div>
//         <div className="text-lg font-semibold text-blue-800">
//           Page {pagination.page} of {pagination.pages}
//         </div>
//       </div>
      
//       {products.length === 0 ? (
//         <div className="text-center text-gray-500 text-lg py-12">
//           No products found
//         </div>
//       ) : (
//         <>
//           {/* Single Product Display - Large Card */}
//           <div className="max-w-6xl mx-auto">
//             {products.map((product) => (
//               <div 
//                 key={product._id} 
//                 className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
//               >
//                 <div className="lg:flex">
//                   {/* Product Image Section */}
//                   <div className="lg:w-1/2">
//                     <div className="h-96 lg:h-full bg-gray-100 flex items-center justify-center p-8">
//                       {product.images && product.images.length > 0 ? (
//                         <img 
//                           src={product.images[0]} 
//                           alt={product.name}
//                           className="h-full w-full object-contain rounded-lg"
//                         />
//                       ) : (
//                         <div className="text-center">
//                           <span className="text-gray-400 text-xl block mb-2">📷</span>
//                           <span className="text-gray-400 text-lg">No Image Available</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Product Details Section */}
//                   <div className="lg:w-1/2 p-8 lg:p-12">
//                     <h1 className="text-4xl font-bold text-gray-900 mb-6">{product.name}</h1>
                    
//                     <p className="text-gray-700 text-lg mb-8 leading-relaxed">
//                       {product.description}
//                     </p>
                    
//                     <div className="space-y-6 mb-8">
//                       <div className="flex items-center justify-between">
//                         <span className="text-3xl font-bold text-green-600">
//                           ₹{product.price}
//                         </span>
//                         <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
//                           product.stock > 0 
//                             ? 'bg-green-100 text-green-800 border border-green-300' 
//                             : 'bg-red-100 text-red-800 border border-red-300'
//                         }`}>
//                           {product.stock > 0 ? '✅ In Stock' : '❌ Out of Stock'}
//                         </span>
//                       </div>
                      
//                       <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
//                         <div>
//                           <span className="font-semibold">Category:</span>
//                           <p className="text-gray-800">{product.category}</p>
//                         </div>
//                         <div>
//                           <span className="font-semibold">Rating:</span>
//                           <p className="text-gray-800">{product.rating || 'No ratings yet'}</p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Action Buttons */}
//                     <div className="flex gap-4">
//                       <button className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition text-lg font-semibold">
//                         View Full Details
//                       </button>
//                       <button 
//                         className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
//                         disabled={product.stock === 0}
//                       >
//                         {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination Controls */}
//           {pagination.pages > 1 && (
//             <div className="flex justify-center items-center space-x-4 mt-12">
//               {/* Previous Button */}
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`px-6 py-3 rounded-lg text-lg font-semibold ${
//                   currentPage === 1
//                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
//                 }`}
//               >
//                 ← Previous
//               </button>

//               {/* Page Numbers */}
//               <div className="flex space-x-2">
//                 {Array.from({ length: pagination.pages }, (_, index) => {
//                   const pageNumber = index + 1;
//                   return (
//                     <button
//                       key={pageNumber}
//                       onClick={() => handlePageChange(pageNumber)}
//                       className={`px-4 py-2 rounded-lg text-lg font-semibold min-w-12 ${
//                         pageNumber === currentPage
//                           ? 'bg-blue-600 text-white shadow-lg'
//                           : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow'
//                       }`}
//                     >
//                       {pageNumber}
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* Next Button */}
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === pagination.pages}
//                 className={`px-6 py-3 rounded-lg text-lg font-semibold ${
//                   currentPage === pagination.pages
//                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
//                 }`}
//               >
//                 Next →
//               </button>
//             </div>
//           )}

//           {/* Quick Navigation */}
//           {pagination.total > 1 && (
//             <div className="text-center mt-6">
//               <p className="text-gray-600 text-sm">
//                 Navigate through all {pagination.total} products using the pagination above
//               </p>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Products;


import React, { useEffect, useState } from "react";
import { getProducts } from "../services/ProductsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 3,
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate()
  // 🔹 Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      // Build query string dynamically
      const query = `page=${pagination.page}&limit=${pagination.limit}${
        search ? `&search=${search}` : ""
      }`;

      const data = await getProducts(query);
      console.log(data);

      setProducts(data.products);
      setPagination((prev) => ({
        ...prev,
        pages: data.pages,
        total: data.total,
      }));
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Refetch whenever page or search changes
  useEffect(() => {
    fetchProducts();
  }, [pagination.page, search]);

  // 🔹 Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  }; 

  
  

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on search
            }}
          />
        </div>

        {/* Loading / Empty States */}
        {loading ? (
          <div className="text-center py-20 text-lg text-gray-600">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-lg text-gray-600">
            No products found.
          </div>
        ) : (
          <>
               
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                  onClick={()=>navigate(`/productDetails/${product._id}`)}
                >
                  <img
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <p className="font-bold text-indigo-600">${product.price}</p>

                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 space-x-2">
              {/* Prev */}
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  pagination.page === 1
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Prev
              </button>

              {/* Page Numbers */}
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    num === pagination.page
                      ? "bg-indigo-700 text-white"
                      : "bg-gray-200 hover:bg-indigo-500 hover:text-white"
                  }`}
                >
                  {num}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  pagination.page === pagination.pages
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Next
              </button>
            </div>

            {/* Info */}
            {/* <div className="text-center mt-4 text-gray-600">
              Page {pagination.page} of {pagination.pages} — Total {pagination.total} products
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;

