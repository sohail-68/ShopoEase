
// import React, { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const ProductListPage = () => {
//   const [params] = useSearchParams();
//   const query = params.get("q");
//   const navigate = useNavigate();

//   // 🔹 Local States
//   const [products, setProducts] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filters, setFilters] = useState({ brand: "", minPrice: "", maxPrice: "" });
//   const [loading, setLoading] = useState(false);

//   // 🔹 Fetch Products
//   const fetchProducts = async () => {
//     setLoading(true);

//     const searchParams = new URLSearchParams();
//     if (query) searchParams.append("search", query);
//     if (filters.brand) searchParams.append("brand", filters.brand);
//     if (filters.minPrice) searchParams.append("minPrice", filters.minPrice);
//     if (filters.maxPrice) searchParams.append("maxPrice", filters.maxPrice);
//     searchParams.append("page", currentPage);
//     searchParams.append("limit", 4);

//     try {
//       const res = await fetch(`https://angular-server-mxyp.onrender.com/api/products?${searchParams.toString()}`);
//       const data = await res.json();

//       setProducts(data.products);
//       setTotalPages(data.pages);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [query, filters, currentPage]);

//   return (
//     <div className="flex">
//       {/* Sidebar Filters */}
//       <aside className="w-1/4 p-4 border-r">
//         <h3 className="font-bold mb-2">Filters</h3>

//         <input
//           placeholder="Brand"
//           value={filters.brand}
//           onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
//           className="border p-1 mb-2 w-full"
//         />

//         <input
//           placeholder="Min Price"
//           type="number"
//           value={filters.minPrice}
//           onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
//           className="border p-1 mb-2 w-full"
//         />

//         <input
//           placeholder="Max Price"
//           type="number"
//           value={filters.maxPrice}
//           onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
//           className="border p-1 mb-4 w-full"
//         />

//         <button
//           onClick={() => setFilters({ brand: "", minPrice: "", maxPrice: "" })}
//           className="border px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
//         >
//           Reset Filters
//         </button>
//       </aside>

//       {/* Main Products Section */}
//       <main className="w-3/4 p-4">
//         {loading ? (
//           <p className="text-center text-gray-500">Loading products...</p>
//         ) : (
//           <>
//             <div className="grid grid-cols-3 gap-4">
//               {products.map((p) => (
//                 <div
//                   key={p._id}
//                   className="border rounded p-3 hover:shadow cursor-pointer"
//                   onClick={() => navigate(`/productDetails/${p._id}`)}
//                 >
//                   <img
//                     src={p.image || p.images?.[0]}
//                     alt={p.name}
//                     className="h-40 w-full object-cover mb-2"
//                   />
//                   <h4 className="font-semibold">{p.name}</h4>
//                   <p>₹{p.price}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex justify-center mt-6">
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i + 1}
//                     onClick={() => setCurrentPage(i + 1)}
//                     className={`px-3 py-1 border mx-1 rounded ${
//                       currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ProductListPage;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { fetchSearchResults } from "../features/searchSlice";

// const ProductListPage = () => {
//   const [params] = useSearchParams();
//   const query = params.get("q");
//   const dispatch = useDispatch();
//   const { results, totalPages, currentPage } = useSelector((state) => state.search);

//   const [filters, setFilters] = useState({ brand: "", minPrice: "", maxPrice: "" });
//   const [page, setPage] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchSearchResults({ q: query, page, ...filters }));
//   }, [query, filters, page]);

//   return (
//     <div className="flex">
//       {/* Sidebar Filters */}
//       <aside className="w-1/4 p-4 border-r">
//         <h3 className="font-bold mb-2">Filters</h3>
//         <input
//           placeholder="Brand"
//           value={filters.brand}
//           onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
//           className="border p-1 mb-2 w-full"
//         />
//         <input
//           placeholder="Min Price"
//           type="number"
//           value={filters.minPrice}
//           onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
//           className="border p-1 mb-2 w-full"
//         />
//         <input
//           placeholder="Max Price"
//           type="number"
//           value={filters.maxPrice}
//           onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
//           className="border p-1 mb-2 w-full"
//         />
//       </aside>

//       {/* Products Section */}
//       <main className="w-3/4 p-4">
//         <div className="grid grid-cols-3 gap-4">
//           {results.map((p) => (
//             <div
//               key={p._id}
//               className="border rounded p-3 hover:shadow cursor-pointer"
//               onClick={() => navigate(`/productDetails/${p._id}`)}
//             >
//               <img
//                 src={p.image}
//                 alt={p.name}
//                 className="h-40 w-full object-cover mb-2"
//               />
//               <h4 className="font-semibold">{p.name}</h4>
//               <p>₹{p.price}</p>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center mt-6">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => setPage(i + 1)}
//               className={`px-3 py-1 border mx-1 rounded ${
//                 currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ProductListPage;

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [allFeatures, setAllFeatures] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 4,
  });
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // Mobile filter toggle

  const search = params.get("q") || "";
  const category = params.get("category") || "";
  const subCategory = params.get("subCategory") || "";
  const subSubCategory = params.get("subSubCategory") || "";
  const navigate = useNavigate();

  // 🔥 Fetch products (with filters + pagination)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      queryParams.append("page", pagination.page);
      queryParams.append("limit", pagination.limit);

      if (search) queryParams.append("search", search);
      if (category) queryParams.append("category", category);
      if (subCategory) queryParams.append("subCategory", subCategory);
      if (subSubCategory) queryParams.append("subSubCategory", subSubCategory);

      params.forEach((value, key) => {
        if (!["q", "page", "limit", "category", "subCategory", "subSubCategory"].includes(key)) {
          queryParams.append(key, value);
        }
      });

      const res = await fetch(`https://angular-server-mxyp.onrender.com/api/products?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();

      setProducts(data.products || []);
      setPagination((prev) => ({
        ...prev,
        page: data.page || 1,
        pages: data.pages || 1,
        total: data.total || 0,
      }));

      if (data.featuresSummary) {
        setAllFeatures(data.featuresSummary);
      }

    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureFilter = (featureKey, featureValue, isChecked) => {
    const newParams = new URLSearchParams(params);
    if (isChecked) {
      newParams.set(featureKey, featureValue);
    } else {
      newParams.delete(featureKey);
    }
    newParams.set("page", "1");
    setParams(newParams);
    setPagination((prev) => ({ ...prev, page: 1 }));
    setShowFilters(false); 
  };

  const clearFeatureFilters = () => {
    const newParams = new URLSearchParams(params);
    Object.keys(allFeatures).forEach((key) => newParams.delete(key));
    setParams(newParams);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams();
    if (search) newParams.set("q", search);
    if (category) newParams.set("category", category);
    if (subCategory) newParams.set("subCategory", subCategory);
    if (subSubCategory) newParams.set("subSubCategory", subSubCategory);
    setParams(newParams);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const clearCategoryFilters = () => {
    const newParams = new URLSearchParams(params);
    newParams.delete("category");
    newParams.delete("subCategory");
    newParams.delete("subSubCategory");
    setParams(newParams);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, params]);

  const dynamicFeatures = allFeatures;
  const hasActiveFeatureFilters = Object.keys(dynamicFeatures).some((key) => params.get(key));
  const hasActiveCategoryFilters = category || subCategory || subSubCategory;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filter Button */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b shadow-sm p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <span>Filters</span>
            {hasActiveFeatureFilters && (
              <span className="bg-white text-blue-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                !
              </span>
            )}
          </button>
          <div className="flex items-center space-x-4">
            {pagination.total > 0 && (
              <span className="text-sm text-gray-600">{pagination.total} products</span>
            )}
            {(hasActiveFeatureFilters || category) && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Hidden on mobile, shown when toggled */}
        <div className={`
          ${showFilters ? 'block' : 'hidden'} 
          lg:block lg:w-1/4 
          bg-white border-r shadow-sm overflow-y-auto
          fixed lg:relative inset-0 z-50 lg:z-auto
          p-4 lg:p-6
        `}>
          {/* Mobile Close Button */}
          <div className="lg:hidden flex justify-between items-center mb-4 pb-4 border-b">
            <h3 className="text-xl font-bold text-gray-800">Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-2xl text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          <div className="lg:hidden mb-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              {search && `Search: "${search}"`}
              {search && category && " • "}
              {category && `Category: ${category}`}
            </p>
            <p className="text-xs text-blue-600 mt-1">{pagination.total} products found</p>
          </div>

          {/* Desktop Clear All Button */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Filters</h3>
            {(hasActiveFeatureFilters || category) && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Search Info - Desktop */}
          <div className="hidden lg:block mb-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              {search && `Search: "${search}"`}
              {search && category && " • "}
              {category && `Category: ${category}`}
            </p>
            <p className="text-xs text-blue-600 mt-1">{pagination.total} products found</p>
          </div>

          {/* 🔥 Dynamic Features Filters */}
          {Object.keys(dynamicFeatures).length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-700">Product Features</h4>
                {hasActiveFeatureFilters && (
                  <button
                    onClick={clearFeatureFilters}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Clear Features
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {Object.keys(dynamicFeatures).map((featureKey) => (
                  <div key={featureKey} className="border-b pb-4 last:border-b-0">
                    <h5 className="font-medium mb-2 text-gray-600 capitalize">{featureKey}</h5>
                    <div className="space-y-2">
                      {dynamicFeatures[featureKey].map((value) => {
                        const isChecked = params.get(featureKey) === value;
                        return (
                          <label key={value} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name={featureKey}
                              checked={isChecked}
                              onChange={(e) => handleFeatureFilter(featureKey, value, e.target.checked)}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span
                              className={`text-sm ${
                                isChecked ? "text-blue-700 font-medium" : "text-gray-700"
                              }`}
                            >
                              {value}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Features Message */}
          {!loading && products.length > 0 && Object.keys(dynamicFeatures).length === 0 && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                No feature filters available
              </p>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="w-full lg:w-3/4 p-4 lg:p-6">
          {/* Mobile Header */}
          <div className="lg:hidden mb-4">
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              {search ? `"${search}"` : category ? `${category}` : "All Products"}
            </h1>
            {pagination.total > 0 && (
              <p className="text-gray-600 text-sm">
                Page {pagination.page} of {pagination.pages}
              </p>
            )}
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {search ? `Search Results for "${search}"` : category ? `Products in ${category}` : "All Products"}
            </h1>
            {pagination.total > 0 && (
              <p className="text-gray-600">
                Page {pagination.page} of {pagination.pages} • {pagination.total} products
              </p>
            )}
          </div>

          {loading && (
            <div className="flex flex-col justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="mt-4 text-gray-600">Loading products...</span>
            </div>
          )}

         {!loading && products.length > 0 ? (
  <>
    {/* Products List - RESPONSIVE */}
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => navigate(`/productDetails/${product._id}`)}
          className="
            flex flex-col sm:flex-row 
            gap-4 p-4 
            cursor-pointer hover:bg-blue-50 
            border-b border-gray-100 last:border-b-0
            transition-all duration-200 group
          "
        >
          {/* IMAGE - RESPONSIVE */}
          <div className="
            w-full sm:w-32 md:w-40 lg:w-48 
            h-48 sm:h-32 md:h-40 lg:h-48
            flex-shrink-0 
            bg-gradient-to-br from-gray-50 to-gray-100 
            rounded-lg overflow-hidden 
            border border-gray-200 
            group-hover:border-blue-200 
            transition-colors
            mx-auto sm:mx-0
          ">
            <img
              src={
                product.images?.[0]
                  ? `https://angular-server-mxyp.onrender.com${product.images[0]}`
                  : "/placeholder-image.jpg"
              }
              alt={product.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
              loading="lazy"
            />
          </div>

          {/* DETAILS - RESPONSIVE */}
          <div className="flex-1 min-w-0 mt-3 sm:mt-0 sm:ml-4">
            
            {/* Product Name - RESPONSIVE */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 mb-2">
              <h3 className="
                text-sm sm:text-base lg:text-lg 
                font-semibold text-gray-900 
                line-clamp-2 
                group-hover:text-blue-700 
                transition-colors
                flex-1
              ">
                {product.name}
              </h3>
              
              {product.stock <= 10 && product.stock > 0 && (
                <span className="
                  inline-flex items-center 
                  px-2 py-1 
                  rounded-full 
                  text-xs 
                  font-medium 
                  bg-orange-100 text-orange-800 
                  flex-shrink-0 
                  self-start sm:self-auto
                ">
                  Only {product.stock} left
                </span>
              )}
            </div>

            {/* Category & Brand - RESPONSIVE */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {product.brand && (
                <span className="
                  inline-flex items-center gap-1 
                  text-xs sm:text-sm 
                  text-gray-600 
                  bg-gray-100 
                  px-2 py-1 
                  rounded
                ">
                  <span className="text-gray-500">🏷️</span>
                  {product.brand}
                </span>
              )}
              
              {product.category && (
                <>
                  <span className="text-xs sm:text-sm text-gray-400 hidden sm:inline">•</span>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {product.category}
                  </span>
                </>
              )}
            </div>

            {/* Rating - RESPONSIVE */}
            {product.rating > 0 && (
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`
                        w-3 h-3 sm:w-4 sm:h-4
                        ${i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                        }
                      `}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-xs sm:text-sm font-medium text-gray-900">
                    {product.rating}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">
                  ({product.numReviews || 0} reviews)
                </span>
              </div>
            )}

            {/* Features - RESPONSIVE */}
            {product.features && Object.keys(product.features).length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Key Features:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(product.features)
                    .slice(0, window.innerWidth < 640 ? 2 : 4)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="
                          bg-blue-50 text-blue-700 
                          text-xs 
                          px-2 py-1 sm:px-3 sm:py-1.5 
                          rounded-lg border border-blue-100
                        "
                      >
                        <span className="font-medium">{key}:</span>
                        <span className="ml-1">{value}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* PRICE & CTA - RESPONSIVE */}
          <div className="
            w-full sm:w-auto 
            mt-4 sm:mt-0 
            text-center sm:text-right 
            flex flex-col items-center sm:items-end 
            justify-between
          ">
            <div>
              {/* Price - RESPONSIVE */}
              {product.originalPrice && product.originalPrice > product.price ? (
                <div className="mb-1">
                  <span className="
                    text-xl sm:text-2xl 
                    font-bold text-gray-900
                  ">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="
                    text-xs sm:text-sm 
                    text-gray-500 line-through ml-2
                  ">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="
                    block sm:inline-block 
                    mt-1 sm:mt-0 sm:ml-2 
                    text-xs 
                    font-semibold 
                    bg-red-100 text-red-700 
                    px-2 py-0.5 
                    rounded
                  ">
                    Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="
                  text-xl sm:text-2xl 
                  font-bold text-gray-900
                ">
                  ₹{product.price.toLocaleString()}
                </span>
              )}

              {/* Delivery Info - RESPONSIVE */}
              <div className="mt-3 space-y-1">
                <div className="
                  flex items-center justify-center sm:justify-end 
                  gap-1 
                  text-xs sm:text-sm 
                  text-green-600 font-medium
                ">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Free Delivery</span>
                </div>
                
                <div className="
                  flex items-center justify-center sm:justify-end 
                  gap-1 
                  text-xs sm:text-sm 
                  text-blue-600
                ">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  <span>COD Available</span>
                </div>
              </div>
            </div>

            {/* Button - RESPONSIVE */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Add quick view functionality here
              }}
              className="
                w-full sm:w-auto
                mt-4 
                px-4 py-2 
                bg-blue-600 text-white 
                text-sm 
                font-medium 
                rounded-lg 
                hover:bg-blue-700 
                transition-colors 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              "
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* PAGINATION - यह वही रहेगा जैसा आपका है */}
    {pagination.pages > 1 && (
      <div className="flex mt-2 flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page <= 1}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm ${
              pagination.page <= 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPagination((prev) => ({ ...prev, page: num }))}
              className={`px-3 py-1 rounded ${
                num === pagination.page
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {num}
            </button>
          ))}
          
          <button
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page >= pagination.pages}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm ${
              pagination.page >= pagination.pages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
        
        <div className="text-sm text-gray-600 mt-2 sm:mt-0">
          Page {pagination.page} of {pagination.pages}
        </div>
      </div>
    )}
  </>
) : (
  !loading && (
    <div className="text-center py-8 sm:py-12">
      <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">🔍</div>
      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-600 mb-2">
        No products found
      </h3>
      <p className="text-gray-500 text-xs sm:text-sm lg:text-base">
        Try adjusting your search criteria or filters
      </p>
      <button
        onClick={clearAllFilters}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
      >
        Clear All Filters
      </button>
    </div>
  )
)}
        </div>
      </div>

      {/* Overlay for mobile filters */}
      {showFilters && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};


export default SearchPage;
