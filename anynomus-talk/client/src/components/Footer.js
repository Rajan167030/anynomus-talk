import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiHeart, FiShield, FiFileText } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Anonymous Talk</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Connect with strangers around the world in a safe, anonymous environment. 
              Chat freely while maintaining your privacy and security.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/Rajan16703"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <FiGithub className="text-xl" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <FiShield className="text-sm" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <FiFileText className="text-sm" />
                  <span>Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Safety & Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <FiShield className="text-green-400" />
                <span>Safe & Secure</span>
              </li>
              <li>Anonymous Chatting</li>
              <li>24/7 Moderation</li>
              <li>Report System</li>
              <li>User Privacy Protected</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300">
              <span>Made with</span>
              <FiHeart className="text-red-500" />
              <span>by</span>
              <a
                href="https://github.com/Rajan16703"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Rajan Jha
              </a>
            </div>
            
            <div className="text-gray-400 text-sm">
              © {currentYear} Anonymous Talk. All rights reserved.
            </div>
          </div>
          
          <div className="mt-4 text-center text-gray-500 text-xs">
            <p>
              This platform promotes safe and respectful communication. 
              Please report any inappropriate behavior.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;