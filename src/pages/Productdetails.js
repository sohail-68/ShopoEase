import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/ProductsApi'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cartSlice'
import axios from 'axios'
import { GetWishlist, AddToWishlist, RemoveFromWishlist, CheckInWishlist } from '../services/wishlistApi';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: '',
  })
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(false)
  const [reviewsError, setReviewsError] = useState(null)
  const [submittingReview, setSubmittingReview] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(null)

  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const data= useSelector((state) => state.auth)
  console.log(data);
  

  

  const userInfo=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  console.log(userInfo);
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const productData = await getProductById(params.id)
        setProduct(productData)
        setLoading(false)
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found')
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
      checkWishlistStatus();
    }
  }, [params.id])

console.log(product);

   useEffect(() => {
    if (product?.images?.length > 0) {
      // Set first image as active by default
      setActiveImage(`https://angular-server-mxyp.onrender.com${product.images[0]}`);
    }
  }, [product]);
    const handleThumbnailClick = (imgUrl) => {
    // Update active image when thumbnail is clicked
    setActiveImage(`https://angular-server-mxyp.onrender.com${imgUrl}`);
  };

useEffect(() => {
  const fetchReviews = async () => {
    try {
      setReviewsLoading(true)
      const res = await axios.get(`https://angular-server-mxyp.onrender.com/api/reviews/product/${params.id}`)
      setReviews(res.data) // Directly set the array, no need for spread
      console.log('Reviews fetched:', res.data)
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
      // Optional: Set error state for reviews
      // setReviewsError('Failed to load reviews')
    } finally {
      setReviewsLoading(false)
    }
  }

  if (params.id) {
    fetchReviews()
  }
}, [params.id])

  const checkWishlistStatus = async () => {
    try {
      const response = await CheckInWishlist(params.id);
      setIsInWishlist(response.data.isInWishlist);
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  };
  const handleWishlistToggle = async () => {
    try {
      setWishlistLoading(true);
      
      if (isInWishlist) {
        await RemoveFromWishlist(params.id);
        setIsInWishlist(false);
        // Show success message
        toast.success('Removed from wishlist');
      } else {
        await AddToWishlist(params.id);
        setIsInWishlist(true);
        // Show success message
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      // Show error message
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setWishlistLoading(false);
    }
  };
console.log(reviews);

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    
    if (!userInfo) {
      alert('Please login to submit a review')
      return
    }

    if (reviewData.rating === 0) {
      alert('Please select a rating')
      return
    }

    setSubmittingReview(true)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post('https://angular-server-mxyp.onrender.com/api/reviews', {
        productId: product._id,
        rating: reviewData.rating,
        comment: reviewData.comment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // Update product with new review
      // setProduct(res.data)
      setReviewData({ rating: 0, comment: '' })
      alert('Review submitted successfully!')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review')
    } finally {
      setSubmittingReview(false)
    }
  }
  console.log(reviews);
  

  const handleAddToCart = () => {
    if (product.countInStock > 0) {
      dispatch(addToCart({ productId: product._id, qty: quantity }))
      toast.success('Product added to cart!')
    }
  }

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value)
    if (newQuantity > 0 && newQuantity <= product.countInStock) {
      setQuantity(newQuantity)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading product details...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-2xl text-red-600">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => window.history.back()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  )

  if (!product) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">Product not found</h2>
      </div>
    </div>
  )



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-2 sm:px-3 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <a href={`/category/${product.category}`} className="hover:text-blue-600 capitalize">
                {product.category}
              </a>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            {/* Product Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
  {/* Star Rating Display */}
  {[1, 2, 3, 4, 5].map((star) => (
    <span 
      key={star} 
      className={`text-lg ${
        star <= Math.round(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
      }`}
    >
      ★
    </span>
  ))}
  
  {/* Rating Text */}
  <span className="ml-2 text-gray-900 font-medium">
    {product.rating?.toFixed(1) || '0.0'} 
    ({product.numReviews || 0} {product.numReviews === 1 ? 'review' : 'reviews'})
  </span>
</div>
                <span>•</span>
                <span>Brand: <strong className="text-gray-900">{product.brand}</strong></span>
                <span>•</span>
                <span>Category: <strong className="text-gray-900 capitalize">{product.category}</strong></span>
              </div>
            </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
  {/* Product Images Section */}
  <div className="space-y-4">
    {product.images && product.images.length > 0 ? (
      <div className="space-y-4">
        {/* Main Image with Zoom Effect */}
        <div className="relative aspect-w-1 aspect-h-1 bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg group">
          <img 
            src={activeImage}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Image Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Zoom Indicator */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
        
        {/* Image Thumbnails */}
        {product.images.length > 1 && (
          <div className="relative">
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
             
              
              {/* Other Thumbnails */}
             {product.images.map((imgUrl, index) => (
                  <div 
                    key={index} 
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                      activeImage === `https://angular-server-mxyp.onrender.com${imgUrl}`
                        ? 'border-blue-500 shadow-md scale-105 ring-2 ring-blue-300'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleThumbnailClick(imgUrl)}
                  >
                    <img 
                      src={`https://angular-server-mxyp.onrender.com${imgUrl}`}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
                    
                    {/* Active Image Indicator */}
                    {activeImage === `https://angular-server-mxyp.onrender.com${imgUrl}` && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                    
                    {/* Image Number Badge */}
                    <span className="absolute top-1 left-1 bg-black/70 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                ))}
            </div>
            
            {/* Navigation Arrows for Many Images */}
            {product.images.length > 5 && (
              <>
                <button className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    ) : (
      <div className="w-full h-96 bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center group hover:border-gray-400 transition-colors duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300 group-hover:text-gray-400 transition-colors duration-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-gray-400 text-lg font-medium">No Image Available</span>
        <span className="text-gray-300 text-sm mt-2">Image will be added soon</span>
      </div>
    )}
  </div>

  {/* Product Details Section */}
  <div className="space-y-6">
    {/* Price Section with Discount */}
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-6 rounded-3xl shadow-sm">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-4xl lg:text-5xl font-bold text-green-800">
            ₹{product.price?.toLocaleString('en-IN')}
          </p>
          <p className="text-green-700 mt-2 text-sm">
            <span className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Inclusive of all taxes
            </span>
          </p>
        </div>
        
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="text-right">
            <p className="text-gray-500 line-through text-lg">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </p>
            <p className="text-white bg-red-500 px-3 py-1 rounded-full text-sm font-bold mt-2 inline-block">
              Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
            </p>
          </div>
        )}
      </div>
    </div>

    {/* Stock & Quantity Section */}
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 p-5 rounded-3xl shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-full ${product.countInStock > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {product.countInStock > 0 ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
          </div>
          <div>
            <p className={`text-lg font-bold ${product.countInStock > 0 ? 'text-green-800' : 'text-red-800'}`}>
              {product.countInStock > 0 ? 'In Stock 🎉' : 'Out of Stock 😔'}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {product.countInStock > 0 
                ? `${product.countInStock} units available • Fast delivery`
                : 'Check back soon for restock updates'
              }
            </p>
          </div>
        </div>
        
        {product.countInStock > 0 && (
          <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-200">
            <label htmlFor="quantity" className="text-sm font-semibold text-gray-700">
              Quantity:
            </label>
            <div className="relative">
              <select
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="appearance-none border border-gray-300 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              >
                {[...Array(Math.min(product.countInStock, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'item' : 'items'}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Features Section */}
    {product.features && Object.keys(product.features).length > 0 && (
      <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Key Features
          </h3>
          <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {Object.keys(product.features).length} features
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(product.features).map(([key, value], index) => (
            <div 
              key={key} 
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm">
                  {index + 1}
                </div>
                <span className="text-gray-700 font-medium capitalize">{key}</span>
              </div>
              <span className="text-gray-900 font-semibold bg-white px-3 py-1.5 rounded-lg text-sm border border-gray-200 group-hover:border-blue-200 group-hover:bg-blue-100 transition-colors duration-300">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Action Buttons */}
    <div className="mt-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={handleAddToCart}
          disabled={product.countInStock === 0}
          className={`group flex-1 py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
            product.countInStock > 0 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            {product.countInStock > 0 ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-lg">Add to Cart</span>
              </>
            ) : (
              <span className="text-lg">Out of Stock</span>
            )}
          </div>
        </button>
        
        <button 
          onClick={handleWishlistToggle}
          disabled={wishlistLoading}
          className={`group flex-1 py-4 px-6 rounded-2xl font-bold border-2 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
            isInWishlist 
              ? 'border-red-500 text-red-600 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100' 
              : 'border-blue-600 text-blue-600 hover:bg-blue-50'
          } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex items-center justify-center gap-3">
            {wishlistLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : isInWishlist ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="text-lg">In Wishlist</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-lg">Add to Wishlist</span>
              </>
            )}
          </div>
        </button>
      </div>
{/*       
      <button className="w-full group py-4 px-6 rounded-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white border-2 border-green-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
        <div className="flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-lg">Buy Now</span>
        </div>
      </button> */}
    </div>

    {/* Trust Badges */}
    <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 p-5 rounded-3xl shadow-sm">
      <h4 className="text-center text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Why Shop With Us?</h4>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col items-center p-3 rounded-xl bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <span className="text-2xl">🛡️</span>
          </div>
          <span className="text-sm font-medium text-gray-700">7-Day Returns</span>
          <span className="text-xs text-gray-500 mt-1">Easy Returns</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <span className="text-2xl">🚚</span>
          </div>
          <span className="text-sm font-medium text-gray-700">Free Delivery</span>
          <span className="text-xs text-gray-500 mt-1">Over ₹999</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <span className="text-2xl">🔒</span>
          </div>
          <span className="text-sm font-medium text-gray-700">Secure Payment</span>
          <span className="text-xs text-gray-500 mt-1">100% Safe</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <span className="text-2xl">⭐</span>
          </div>
          <span className="text-sm font-medium text-gray-700">Authentic</span>
          <span className="text-xs text-gray-500 mt-1">Quality Assured</span>
        </div>
      </div>
    </div>
  </div>
</div>

            {/* Tabs Section */}
           <div className="mt-16">
  {/* Enhanced Tab Navigation */}
  <div className="relative">
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-1 border border-gray-200 shadow-sm">
      <nav className="flex space-x-1" role="tablist">
        {[
          { id: 'description', label: 'Description', icon: '📝' },
          { id: 'reviews', label: 'Reviews', icon: '⭐', count: product.reviews?.length || 0 },
          { id: 'specifications', label: 'Specifications', icon: '🔧' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center justify-center lg:gap-2 lg:px-6 lg:py-4 max-lg:py-2 max-lg:px-2 max-lg:gap-1 rounded-xl font-medium text-sm transition-all duration-300 group ${
              activeTab === tab.id
                ? 'text-blue-600 bg-white shadow-lg border border-blue-100'
                : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="font-semibold">{tab.label}</span>
            
            {/* Review Count Badge */}
            {tab.count > 0 && tab.id === 'reviews' && (
              <span className={`absolute -top-2 -right-2 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center transition-all duration-300 ${
                activeTab === 'reviews'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 group-hover:bg-blue-100 group-hover:text-blue-600'
              }`}>
                {tab.count}
              </span>
            )}
            
            {/* Active Tab Indicator */}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-full"></div>
            )}
          </button>
        ))}
      </nav>
    </div>
  </div>

  {/* Tab Content */}
  <div className="mt-8 animate-fadeIn">
    {/* Description Tab */}
    {activeTab === 'description' && (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <span className="text-2xl">📖</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Product Description</h3>
            <p className="text-gray-500 text-sm">Everything you need to know about this product</p>
          </div>
        </div>
        
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 border-blue-500">
            {product.description || "No description available for this product."}
          </p>
          
          {/* Additional Description Features */}
          {product.description && product.description.length > 100 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <span className="text-blue-600">✅</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Highlights</h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Premium quality material
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Long-lasting durability
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Excellent value for money
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <span className="text-green-600">🎯</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Key Benefits</h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Enhanced performance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    User-friendly design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Reliable and efficient
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Reviews Tab */}
    {activeTab === 'reviews' && (
      <div className="space-y-8 animate-fadeIn">
        {/* Review Form */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center">
              <span className="text-2xl">✍️</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Share Your Experience</h3>
              <p className="text-gray-500 text-sm">Your review helps other customers</p>
            </div>
          </div>
          
          {userInfo ? (
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              {/* Rating Section */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  How would you rate this product?
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewData({...reviewData, rating: star})}
                      className="group relative focus:outline-none transform hover:scale-110 transition-transform duration-200"
                    >
                      <span className={`text-4xl ${
                        star <= reviewData.rating 
                          ? 'text-yellow-400 drop-shadow-lg' 
                          : 'text-gray-300 group-hover:text-yellow-300'
                      }`}>
                        ★
                      </span>
                      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        {star} {star === 1 ? 'star' : 'stars'}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Selected: <span className="font-semibold text-yellow-600">{reviewData.rating}/5</span>
                </p>
              </div>
              
              {/* Comment Section */}
              <div>
                <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-3">
                  Your Review
                </label>
                <div className="relative">
                  <textarea
                    id="comment"
                    rows="5"
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none transition-all duration-200"
                    placeholder="Tell us about your experience with this product..."
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {reviewData.comment.length}/500
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {submittingReview ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Submit Review
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">Login Required</h4>
              <p className="text-yellow-700 mb-4">
                Please sign in to share your review and help other customers
              </p>
              <a 
                href="/login" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Go to Login
              </a>
            </div>
          )}
        </div>

        {/* Reviews List */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
                <p className="text-gray-500 text-sm">What others are saying</p>
              </div>
            </div>
            
            {/* Average Rating */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">
                  {product.averageRating || '4.5'}
                </div>
                <div className="flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`text-sm ${
                      star <= Math.round(product.averageRating || 4.5) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {product.reviews.length} reviews
                </p>
              </div>
            )}
          </div>
          
          {reviews && reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-xl p-6 hover:border-blue-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-blue-600 font-bold text-lg">
                            {review.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                          <span className="text-xs">👤</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                          key={star} 
                          className={`text-xl ${
                            star <= review.rating 
                              ? 'text-yellow-400 drop-shadow' 
                              : 'text-gray-200'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    "{review.comment}"
                  </p>
                  
                  {/* Helpful Votes */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      Helpful ({review.helpful || 0})
                    </button>
                    <button className="text-gray-500 hover:text-red-600 text-sm font-medium">
                      Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📝</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">No Reviews Yet</h4>
              <p className="text-gray-500 max-w-md mx-auto">
                Be the first to share your thoughts about this product. Your review will help other customers make informed decisions.
              </p>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Specifications Tab */}
    {activeTab === 'specifications' && (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm animate-fadeIn">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center">
            <span className="text-2xl">📊</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Product Specifications</h3>
            <p className="text-gray-500 text-sm">Detailed technical information</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Details */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600">📦</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Product Details</h4>
            </div>
            <dl className="space-y-4">
              {[
                { label: 'Brand', value: product.brand, icon: '🏷️' },
                { label: 'Category', value: product.category, icon: '📁' },
                { label: 'Sub Category', value: product.subCategory, icon: '📂' },
              ].map((item, index) => (
                item.value && (
                  <div 
                    key={index} 
                    className="flex items-center justify-between py-3 px-4 rounded-lg bg-white hover:bg-blue-50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <dt className="text-gray-600 font-medium">{item.label}</dt>
                    </div>
                    <dd className="text-gray-900 font-semibold capitalize">{item.value}</dd>
                  </div>
                )
              ))}
            </dl>
          </div>

          {/* Stock Information */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-green-600">📈</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Stock Information</h4>
            </div>
            <dl className="space-y-4">
              <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-white hover:bg-green-50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <span className={`text-lg ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.countInStock > 0 ? '✅' : '❌'}
                  </span>
                  <dt className="text-gray-600 font-medium">Availability</dt>
                </div>
                <dd className={product.countInStock > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </dd>
              </div>
              
              <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-white hover:bg-green-50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <span className="text-lg">📊</span>
                  <dt className="text-gray-600 font-medium">Units Available</dt>
                </div>
                <dd className="text-gray-900 font-bold">
                  {product.countInStock} units
                </dd>
              </div>
              
              <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-white hover:bg-green-50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🚚</span>
                  <dt className="text-gray-600 font-medium">Delivery Time</dt>
                </div>
                <dd className="text-gray-900 font-bold">
                  {product.countInStock > 0 ? '2-3 days' : 'Restocking'}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Features Grid */}
        {product.features && Object.keys(product.features).length > 0 && (
          <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600">⚡</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Additional Features</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.features).map(([key, value], index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-md bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 text-sm font-bold">{index + 1}</span>
                    </div>
                    <dt className="text-gray-700 font-medium capitalize">{key}</dt>
                  </div>
                  <dd className="text-gray-900 font-semibold pl-10">{value}</dd>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )}
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails