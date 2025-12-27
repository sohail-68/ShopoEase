import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Search, ShoppingCart, User, Menu, X, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { GetAllCategory } from '../services/homeapi';

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [hoverEnter, setHoverEnter] = useState(null);
    const [hoverSubIndex, setHoverSubIndex] = useState(null);

    const navigate = useNavigate();

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await GetAllCategory();
            
            if (res.data && res.data.success) {
                setCategories(res.data.data);
            } else {
                setError('Failed to fetch categories');
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Error loading categories. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const getCategoryIcon = (categoryName) => {
        const iconMap = {
            'electronics': '💻',
            'fashion': '👗',
            'phone': '📱',
            'shirt': '👕',
            'suit': '👔',
            'gadda': '🛏️',
            'voltaas': '🔌',
            'mobile': '📱',
            'laptop': '💻',
            'tv': '📺',
            'camera': '📷',
            'watch': '⌚',
            'shoes': '👟',
            'bag': '👜',
            'book': '📚',
            'toy': '🧸',
            'home': '🏠',
            'kitchen': '🍳',
            'food': '🍔',
            'health': '💊',
            'sports': '⚽',
            'beauty': '💄',
            'jewelry': '💍',
            'car': '🚗',
            'bike': '🚲',
            'gift': '🎁',
            'default': '📦'
        };

        const lowerName = categoryName.toLowerCase();
        for (const [key, icon] of Object.entries(iconMap)) {
            if (lowerName.includes(key)) {
                return icon;
            }
        }
        return iconMap.default;
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/results?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const featuredCategories = categories.slice(0, 8);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#2874f0] mx-auto"></div>
                    <p className="mt-6 text-gray-600 text-lg">Loading amazing categories...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
                <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{error}</h3>
                    <button 
                        onClick={fetchCategories}
                        className="bg-[#2874f0] text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
           

            {/* Hero Banner - Flipkart Style */}
            <section className="container mx-auto px-4 py-8">
                <div className="bg-gradient-to-r from-[#2874f0] to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Big Billion Days
                        </h1>
                        <p className="text-xl mb-6 opacity-90">
                            Up to 80% off on Electronics, Fashion & more
                        </p>
                        <button 
                            className="bg-white text-[#2874f0] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg"
                            onClick={() => navigate('/results')}
                        >
                            Shop Now <ArrowRight className="inline ml-2 h-5 w-5" />
                        </button>
                    </div>
                    <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-400 to-transparent opacity-20"></div>
                </div>
            </section>

            {/* Featured Categories - Improved Hover Menu */}
            <section className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Categories</h2>
                    <button 
                        className="text-[#2874f0] hover:text-blue-700 font-semibold flex items-center"
                        onClick={() => navigate('/results')}
                    >
                        View All <ChevronRight className="ml-1 h-5 w-5" />
                    </button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 relative">
                    {featuredCategories.map((category, index) => (
                        <div 
                            key={index}
                            className="group relative"
                            onMouseEnter={() => setHoverEnter(index)}
                            onMouseLeave={() => {
                                setHoverEnter(null);
                                setHoverSubIndex(null);
                            }}
                        >
                            {/* Main Category Card */}
                            <div 
                                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105 text-center border border-gray-100 cursor-pointer"
                                onClick={() => navigate(`/results?category=${category.category}`)}
                            >
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                                    <span className="text-xl sm:text-2xl">{getCategoryIcon(category.category)}</span>
                                </div>
                                <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#2874f0] transition-colors line-clamp-2">
                                    {category.category}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {category.subCategories.length} items
                                </p>
                            </div>

                            {/* Hover Menu */}
                          {hoverEnter === index && category.subCategories.length > 0 && (
    <div className="absolute top-full left-0 mt-3 w-[300px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[480px] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2874f0] to-blue-600 p-4 text-white">
            <h3 className="font-bold text-lg truncate">{category.category}</h3>
            <p className="text-blue-100 text-sm opacity-90">Explore sub-categories</p>
        </div>
        
        {/* Sub Categories - Scrollable */}
        <div className="p-4 max-h-[320px] overflow-y-auto">
            <div className="space-y-2">
                {category.subCategories.map((subCategory, subIndex) => (
                    <div 
                        key={subIndex}
                        className="relative group/sub"
                        onMouseEnter={() => setHoverSubIndex(subIndex)}
                        onMouseLeave={() => setHoverSubIndex(null)}
                    >
                        <div 
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-all duration-200 border border-transparent hover:border-blue-200 group-hover/sub:bg-blue-50"
                            onClick={() => navigate(`/results?category=${category.category}&subCategory=${subCategory.subCategory}`)}
                        >
                            <div className="flex items-center space-x-3 min-w-0 flex-1">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-green-600 text-sm">🔹</span>
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-semibold text-gray-800 text-sm truncate">
                                        {subCategory.subCategory}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {subCategory.subSubCategories.length} items
                                    </p>
                                </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                        </div>

                        {/* Sub-Sub Categories - Fix overflow issues */}
                        {hoverSubIndex === subIndex && subCategory.subSubCategories.length > 0 && (
                            <div className="absolute left-full top-0 ml-2 w-[360px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[320px] overflow-hidden">
                                <div className="p-4 max-h-[320px] flex flex-col">
                                    <h5 className="font-semibold text-gray-800 mb-3 text-sm border-b pb-2 truncate">
                                        {subCategory.subCategory}
                                    </h5>
                                    <div className="flex-1 overflow-y-auto">
                                        <div className="space-y-2">
                                            {subCategory.subSubCategories.map((subSubCategory, subSubIndex) => (
                                                <div
                                                    key={subSubIndex}
                                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-green-50 cursor-pointer transition-all duration-200 border border-transparent hover:border-green-200"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/results?category=${category.category}&subCategory=${subCategory.subCategory}&subSubCategory=${subSubCategory}`);
                                                    }}
                                                >
                                                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                                                        <span className="text-green-500 text-base">🔸</span>
                                                        <span className="text-sm text-gray-700 group-hover:text-green-600 truncate">
                                                            {subSubCategory}
                                                        </span>
                                                    </div>
                                                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors flex-shrink-0 ml-2">
                                                        View
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
            <button 
                className="w-full bg-[#2874f0] hover:bg-blue-700 text-white py-3 rounded-lg transition-colors text-sm font-semibold"
                onClick={() => navigate(`/results?category=${category.category}`)}
            >
                View All in {category.category}
            </button>
        </div>
    </div>
)}
                        </div>
                    ))}
                </div>
            </section>

            {/* All Categories Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        All Categories
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore {categories.length} categories with amazing deals
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            {/* Category Header */}
                            <div 
                                className={`p-6 border-b cursor-pointer transition-all duration-200 ${
                                    selectedCategory?.category === category.category 
                                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200' 
                                        : 'hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div 
                                        className="flex items-center space-x-4 flex-1"
                                        onClick={() => navigate(`/results?category=${category.category}`)}
                                    >
                                        <div className="w-14 h-14 bg-gradient-to-br from-[#2874f0] to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-2xl text-white">
                                                {getCategoryIcon(category.category)}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#2874f0] transition-colors">
                                                {category.category}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {category.subCategories.length} sub-categories
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div 
                                        className={`p-2 rounded-full hover:bg-gray-200 cursor-pointer transition-all duration-200 ${
                                            selectedCategory?.category === category.category ? 'bg-blue-100 text-blue-600' : 'text-gray-400'
                                        }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedCategory(
                                                selectedCategory?.category === category.category 
                                                    ? null 
                                                    : category
                                            );
                                        }}
                                    >
                                        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${
                                            selectedCategory?.category === category.category ? 'rotate-180' : ''
                                        }`} />
                                    </div>
                                </div>
                            </div>

                            {/* Sub Categories */}
                            {selectedCategory?.category === category.category && (
                                <div className="p-4 bg-gradient-to-br from-gray-50 to-white">
                                    {category.subCategories.length === 0 ? (
                                        <div className="text-center py-4 text-gray-500">
                                            No sub-categories available
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {category.subCategories.map((subCategory, subIndex) => (
                                                <div 
                                                    key={subIndex}
                                                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                                                >
                                                    <div 
                                                        className={`p-4 cursor-pointer transition-all duration-200 ${
                                                            selectedSubCategory?.subCategory === subCategory.subCategory 
                                                                ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' 
                                                                : 'hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div 
                                                                className="flex items-center space-x-3 flex-1"
                                                                onClick={() => navigate(`/results?category=${category.category}&subCategory=${subCategory.subCategory}`)}
                                                            >
                                                                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                                                                    <span className="text-white text-sm">🔹</span>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-semibold text-gray-900">
                                                                        {subCategory.subCategory}
                                                                    </h4>
                                                                    <p className="text-xs text-gray-600">
                                                                        {subCategory.subSubCategories.length} items
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            
                                                            <div 
                                                                className={`p-1 rounded hover:bg-gray-100 cursor-pointer transition-colors ${
                                                                    selectedSubCategory?.subCategory === subCategory.subCategory ? 'text-green-600' : 'text-gray-400'
                                                                }`}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectedSubCategory(
                                                                        selectedSubCategory?.subCategory === subCategory.subCategory 
                                                                            ? null 
                                                                            : subCategory
                                                                    );
                                                                }}
                                                            >
                                                                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                                                                    selectedSubCategory?.subCategory === subCategory.subCategory ? 'rotate-180' : ''
                                                                }`} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Sub-Sub Categories */}
                                                    {selectedSubCategory?.subCategory === subCategory.subCategory && (
                                                        <div className="p-3 bg-white border-t">
                                                            {subCategory.subSubCategories.length === 0 ? (
                                                                <div className="text-center py-2 text-gray-500 text-sm">
                                                                    No items available
                                                                </div>
                                                            ) : (
                                                                <div className="grid grid-cols-1 gap-2">
                                                                    {subCategory.subSubCategories.map((subSubCategory, subSubIndex) => (
                                                                        <div 
                                                                            key={subSubIndex}
                                                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 group"
                                                                            onClick={() => navigate(`/results?category=${category.category}&subCategory=${subCategory.subCategory}&subSubCategory=${subSubCategory}`)}
                                                                        >
                                                                            <div className="flex items-center space-x-3">
                                                                                <span className="text-gray-400 group-hover:text-blue-600 transition-colors">🔸</span>
                                                                                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                                                                                    {subSubCategory}
                                                                                </span>
                                                                            </div>
                                                                            <button className="bg-[#2874f0] text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-all duration-200 text-xs font-semibold">
                                                                                View
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Quick Stats */}
                {/* {categories.length > 0 && (
                    <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Categories Overview</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center group">
                                <div className="text-4xl font-bold text-[#2874f0] mb-3 group-hover:scale-110 transition-transform">
                                    {categories.length}
                                </div>
                                <div className="text-gray-600 font-medium">Total Categories</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl font-bold text-green-600 mb-3 group-hover:scale-110 transition-transform">
                                    {categories.reduce((total, cat) => total + cat.subCategories.length, 0)}
                                </div>
                                <div className="text-gray-600 font-medium">Sub Categories</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl font-bold text-purple-600 mb-3 group-hover:scale-110 transition-transform">
                                    {categories.reduce((total, cat) => 
                                        total + cat.subCategories.reduce((subTotal, sub) => 
                                            subTotal + sub.subSubCategories.length, 0
                                        ), 0
                                    )}
                                </div>
                                <div className="text-gray-600 font-medium">Total Items</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl font-bold text-orange-600 mb-3 group-hover:scale-110 transition-transform">
                                    {categories.filter(cat => cat.subCategories.length > 0).length}
                                </div>
                                <div className="text-gray-600 font-medium">Active Categories</div>
                            </div>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default HomePage;