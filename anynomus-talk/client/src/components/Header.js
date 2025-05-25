import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiLogOut, FiMenu, FiX, FiMessageCircle } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', public: true },
    { path: '/about', label: 'About', public: true },
    { path: '/chat', label: 'Chat', public: false },
    { path: '/profile', label: 'Profile', public: false },
  ];

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 relative z-50 sticky top-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 text-2xl font-bold text-white hover:text-yellow-300 transition-all duration-300 group"
          >
            <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <FiMessageCircle className="text-xl text-white" />
            </div>
            <span className="font-display">Anonymous Talk</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map(link => {
              if (!link.public && !user) return null;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-white bg-white/20 backdrop-blur-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="p-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full">
                    <FiUser className="text-sm text-white" />
                  </div>
                  <div className="text-white">
                    <span className="text-sm">Welcome,</span>
                    <span className="block text-sm font-medium">{user.email.split('@')[0]}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-xl transition-all duration-300 group"
                >
                  <FiLogOut className="group-hover:rotate-12 transition-transform duration-300" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-white hover:text-yellow-300 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
          >
            {mobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map(link => {
                if (!link.public && !user) return null;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      isActive(link.path)
                        ? 'text-white bg-white/20 backdrop-blur-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              {user ? (
                <div className="pt-4 border-t border-white/20 space-y-3">
                  <div className="px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-center space-x-3">
                      <div className="p-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full">
                        <FiUser className="text-sm text-white" />
                      </div>
                      <div className="text-white">
                        <span className="text-sm">Welcome,</span>
                        <span className="block text-sm font-medium">{user.email.split('@')[0]}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-base font-medium text-white bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-xl transition-all duration-300"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-white/20 space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-white hover:text-yellow-300 transition-colors text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-base font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;