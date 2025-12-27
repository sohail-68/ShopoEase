import React from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ShopeEase
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We deliver excellence through innovative solutions and exceptional customer service.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-all duration-300 hover:scale-110">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-blue-400 rounded-lg transition-all duration-300 hover:scale-110">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-pink-600 rounded-lg transition-all duration-300 hover:scale-110">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-blue-700 rounded-lg transition-all duration-300 hover:scale-110">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-700">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-700">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">
                  Product Development
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">
                  Web Solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">
                  Consulting
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">
                  Training
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-700">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-indigo-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Business Street, Suite 100<br />New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-indigo-400 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-indigo-400 flex-shrink-0" />
                <span className="text-gray-300">info@ShopeEase.com</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3">Stay Updated</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-grow px-4 py-2 rounded-l-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-r-lg font-medium hover:opacity-90 transition-opacity">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} BrandName. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Cookies
            </a>
          </div>
          
          <div className="mt-4 md:mt-0 text-gray-400 text-sm flex items-center">
            Made with <FaHeart className="text-red-500 mx-2" /> by BrandName
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-8">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center mx-auto"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;