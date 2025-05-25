import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiPhone, 
  FiUser,
  FiHeart
} from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch
  } = useForm();

  const password = watch('password');

  const interestOptions = [
    'Music', 'Movies', 'Sports', 'Gaming', 'Technology', 'Travel',
    'Food', 'Art', 'Books', 'Photography', 'Fitness', 'Fashion',
    'Science', 'Politics', 'Business', 'Education', 'Health', 'Nature'
  ];

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const userData = {
        email: data.email,
        phone: data.phone || null,
        password: data.password,
        gender: data.gender,
        preferredGender: data.preferredGender,
        interests: selectedInterests
      };

      const result = await registerUser(userData);
      if (result.success) {
        navigate('/chat');
      } else {
        setError('root', { message: result.error });
      }
    } catch (error) {
      setError('root', { message: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-2xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card-glass p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="font-display text-4xl font-bold text-white mb-2">
                Join Anonymous Talk
              </h2>
              <p className="text-white/80 text-lg">
                Create your account and start meeting new people
              </p>
            </motion.div>
          </div>

          <motion.form 
            className="space-y-6 mt-8" 
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Field */}
              <div className="md:col-span-2">
                <div className="floating-input">
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    type="email"
                    className="floating-input-field"
                    placeholder=" "
                  />
                  <label className="floating-input-label">
                    <FiMail className="w-5 h-5 mr-2" />
                    Email Address *
                  </label>
                </div>
                {errors.email && (
                  <motion.p 
                    className="mt-2 text-sm text-red-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Phone Field */}
              <div className="md:col-span-2">
                <div className="floating-input">
                  <input
                    {...register('phone', {
                      pattern: {
                        value: /^\+?[\d\s\-\(\)]{10,}$/,
                        message: 'Please enter a valid phone number'
                      }
                    })}
                    type="tel"
                    className="floating-input-field"
                    placeholder=" "
                  />
                  <label className="floating-input-label">
                    <FiPhone className="w-5 h-5 mr-2" />
                    Phone Number (Optional)
                  </label>
                </div>
                {errors.phone && (
                  <motion.p 
                    className="mt-2 text-sm text-red-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.phone.message}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="floating-input">
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    className="floating-input-field"
                    placeholder=" "
                  />
                  <label className="floating-input-label">
                    <FiLock className="w-5 h-5 mr-2" />
                    Password *
                  </label>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p 
                    className="mt-2 text-sm text-red-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <div className="floating-input">
                  <input
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match'
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="floating-input-field"
                    placeholder=" "
                  />
                  <label className="floating-input-label">
                    <FiLock className="w-5 h-5 mr-2" />
                    Confirm Password *
                  </label>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p 
                    className="mt-2 text-sm text-red-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.confirmPassword.message}
                  </motion.p>
                )}
              </div>

              {/* Gender Field */}
              <div>
                <div className="floating-input">
                  <select
                    {...register('gender', { required: 'Please select your gender' })}
                    className="floating-input-field"
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <label className="floating-input-label">
                    <FiUser className="w-5 h-5 mr-2" />
                    Your Gender *
                  </label>
                </div>
                {errors.gender && (
                  <motion.p 
                    className="mt-2 text-sm text-red-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.gender.message}
                  </motion.p>
                )}
              </div>

              {/* Preferred Gender Field */}
              <div>
                <div className="floating-input">
                  <select
                    {...register('preferredGender')}
                    className="floating-input-field"
                  >
                    <option value="any">Anyone</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <label className="floating-input-label">
                    <FiHeart className="w-5 h-5 mr-2" />
                    Preferred Chat Partner
                  </label>
                </div>
              </div>
            </div>

            {/* Interests Section */}
            <div>
              <label className="block text-lg font-medium text-white mb-3">
                Interests (Optional)
              </label>
              <p className="text-white/70 mb-4">
                Select topics you're interested in to find like-minded people
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                  <motion.button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-3 text-sm rounded-xl border transition-all duration-300 ${
                      selectedInterests.includes(interest)
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50 text-white shadow-lg'
                        : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:border-white/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {interest}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {errors.root && (
              <motion.div 
                className="bg-red-500/10 border border-red-400/30 rounded-xl p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm text-red-300">{errors.root.message}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner size="sm" color="white" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white/60">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <Link
                to="/login"
                className="group inline-flex items-center space-x-2 font-medium text-white hover:text-purple-300 transition-colors"
              >
                <span>Sign in to your account</span>
                <motion.div
                  className="w-5 h-5"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </Link>
            </div>
          </motion.form>

          {/* Additional Info */}
          <motion.div 
            className="text-center text-sm text-white/70 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p>
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-purple-300 hover:text-purple-200 transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-purple-300 hover:text-purple-200 transition-colors">
                Privacy Policy
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;