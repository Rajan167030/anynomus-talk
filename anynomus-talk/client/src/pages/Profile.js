import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiHeart, 
  FiEdit3, 
  FiSave,
  FiX,
  FiCalendar,
  FiActivity
} from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState(user?.interests || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm({
    defaultValues: {
      gender: user?.gender || '',
      preferredGender: user?.preferredGender || 'any'
    }
  });

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
      const updateData = {
        ...data,
        interests: selectedInterests
      };

      const result = await updateProfile(updateData);
      if (result.success) {
        setIsEditing(false);
      } else {
        setError('root', { message: result.error });
      }
    } catch (error) {
      setError('root', { message: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedInterests(user?.interests || []);
    reset({
      gender: user?.gender || '',
      preferredGender: user?.preferredGender || 'any'
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Your Profile
            </motion.h1>
            <motion.p 
              className="text-white/70 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Manage your account settings and preferences
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <motion.div 
                className="glass-card p-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <FiUser className="text-4xl text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {user?.email?.split('@')[0] || 'Anonymous User'}
                  </h2>
                  <p className="text-white/70 capitalize text-lg">
                    {user?.gender || 'Not specified'}
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-center space-x-4 text-sm text-white/60">
                      <div className="flex items-center space-x-2">
                        <FiCalendar className="text-lg" />
                        <span>Joined {formatDate(user?.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div 
                className="glass-card p-6 mt-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Status</span>
                    <span className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-medium">Online</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Account Type</span>
                    <span className="text-purple-400 font-medium">Standard</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Verification</span>
                    <span className={`font-medium ${user?.verified ? 'text-green-400' : 'text-yellow-400'}`}>
                      {user?.verified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <motion.div 
                className="glass-card p-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">
                    Profile Information
                  </h3>
                  {!isEditing ? (
                    <motion.button
                      onClick={() => setIsEditing(true)}
                      className="btn-primary flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiEdit3 className="text-lg" />
                      <span>Edit Profile</span>
                    </motion.button>
                  ) : (
                    <div className="flex space-x-3">
                      <motion.button
                        onClick={handleCancel}
                        className="btn-secondary flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiX className="text-lg" />
                        <span>Cancel</span>
                      </motion.button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Gender Field */}
                    <div>
                      <label className="block text-lg font-medium text-white mb-3">
                        Gender
                      </label>
                      <select
                        {...register('gender', { required: 'Please select your gender' })}
                        className="modern-input"
                      >
                        <option value="">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
                      )}
                    </div>

                    {/* Preferred Gender Field */}
                    <div>
                      <label className="block text-lg font-medium text-white mb-3">
                        Preferred Chat Partner
                      </label>
                      <select
                        {...register('preferredGender')}
                        className="modern-input"
                      >
                        <option value="any">Anyone</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Interests */}
                    <div>
                      <label className="block text-lg font-medium text-white mb-4">
                        Interests
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {interestOptions.map((interest) => (
                          <motion.button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`px-4 py-3 text-sm rounded-xl border transition-all duration-300 ${
                              selectedInterests.includes(interest)
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 text-white shadow-lg'
                                : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
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
                      <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-4">
                        <p className="text-red-300">{errors.root.message}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 w-full justify-center"
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner size="sm" color="white" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <FiSave className="text-lg" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                ) : (
                  <div className="space-y-8">
                    {/* Account Information */}
                    <div>
                      <h4 className="text-xl font-bold text-white mb-6">
                        Account Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl border border-white/20">
                          <FiMail className="text-purple-400 text-xl" />
                          <div>
                            <p className="text-sm text-white/60">Email</p>
                            <p className="font-medium text-white">{user?.email}</p>
                          </div>
                        </div>
                        
                        {user?.phone && (
                          <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl border border-white/20">
                            <FiPhone className="text-purple-400 text-xl" />
                            <div>
                              <p className="text-sm text-white/60">Phone</p>
                              <p className="font-medium text-white">{user.phone}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Chat Preferences */}
                    <div>
                      <h4 className="text-xl font-bold text-white mb-6">
                        Chat Preferences
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl border border-white/20">
                          <FiUser className="text-purple-400 text-xl" />
                          <div>
                            <p className="text-sm text-white/60">Your Gender</p>
                            <p className="font-medium text-white capitalize">
                              {user?.gender || 'Not specified'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl border border-white/20">
                          <FiHeart className="text-pink-400 text-xl" />
                          <div>
                            <p className="text-sm text-white/60">Preferred Partner</p>
                            <p className="font-medium text-white capitalize">
                              {user?.preferredGender === 'any' ? 'Anyone' : user?.preferredGender || 'Anyone'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interests */}
                    <div>
                      <h4 className="text-xl font-bold text-white mb-6">
                        Your Interests
                      </h4>
                      {user?.interests && user.interests.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {user.interests.map((interest) => (
                            <motion.span
                              key={interest}
                              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium shadow-lg"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {interest}
                            </motion.span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-white/60 italic">
                          No interests selected. Add some to find like-minded people!
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;