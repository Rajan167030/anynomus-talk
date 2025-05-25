import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { 
  FiSend, 
  FiSkipForward, 
  FiFlag, 
  FiUser, 
  FiSearch,
  FiMessageCircle,
  FiAlertTriangle,
  FiHeart,
  FiSettings
} from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Chat = () => {
  const { user } = useAuth();
  const {
    connected,
    currentChat,
    messages,
    isTyping,
    chatStatus,
    findChat,
    sendMessage,
    skipChat,
    reportUser,
    startTyping,
    stopTyping
  } = useSocket();

  const [messageInput, setMessageInput] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const interestOptions = [
    'Music', 'Movies', 'Sports', 'Gaming', 'Technology', 'Travel',
    'Food', 'Art', 'Books', 'Photography', 'Fitness', 'Fashion',
    'Science', 'Politics', 'Business', 'Education', 'Health', 'Nature'
  ];

  const reportReasons = [
    { value: 'inappropriate_content', label: 'Inappropriate Content' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'spam', label: 'Spam' },
    { value: 'fake_profile', label: 'Fake Profile' },
    { value: 'other', label: 'Other' }
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat starts
  useEffect(() => {
    if (chatStatus === 'connected') {
      inputRef.current?.focus();
    }
  }, [chatStatus]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() && chatStatus === 'connected') {
      sendMessage(messageInput);
      setMessageInput('');
      stopTyping();
    }
  };

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
    
    // Handle typing indicators
    if (chatStatus === 'connected') {
      startTyping();
      
      // Clear existing timeout
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      
      // Set new timeout to stop typing
      const timeout = setTimeout(() => {
        stopTyping();
      }, 1000);
      
      setTypingTimeout(timeout);
    }
  };

  const handleFindChat = () => {
    if (selectedInterests.length > 0) {
      findChat(selectedInterests);
    } else {
      findChat();
    }
    setShowInterestsModal(false);
  };

  const handleSkipChat = () => {
    skipChat();
    toast.info('Looking for a new chat partner...');
  };

  const handleReport = (reason, description = '') => {
    reportUser(reason, description);
    setShowReportModal(false);
    handleSkipChat();
  };

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <LoadingSpinner size="lg" color="white" />
          <p className="mt-4 text-lg">Connecting to chat server...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-6 h-screen flex flex-col">
        {/* Header */}
        <motion.div 
          className="glass-card p-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div 
                className={`w-4 h-4 rounded-full ${
                  chatStatus === 'connected' ? 'bg-green-400' : 
                  chatStatus === 'searching' ? 'bg-yellow-400' : 'bg-blue-400'
                }`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-semibold text-white text-lg">
                {chatStatus === 'idle' && 'Ready to chat'}
                {chatStatus === 'searching' && 'Finding someone for you...'}
                {chatStatus === 'connected' && 'Connected with a stranger'}
                {chatStatus === 'ended' && 'Chat ended'}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              {chatStatus === 'idle' && (
                <>
                  <motion.button
                    onClick={() => setShowInterestsModal(true)}
                    className="btn-secondary flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiSettings className="text-lg" />
                    <span>Interests</span>
                  </motion.button>
                  <motion.button
                    onClick={handleFindChat}
                    className="btn-primary flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiSearch className="text-lg" />
                    <span>Find Chat</span>
                  </motion.button>
                </>
              )}
              
              {chatStatus === 'connected' && (
                <>
                  <motion.button
                    onClick={() => setShowReportModal(true)}
                    className="px-4 py-2 bg-red-500/20 border border-red-400/30 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiFlag className="text-lg" />
                    <span>Report</span>
                  </motion.button>
                  <motion.button
                    onClick={handleSkipChat}
                    className="px-4 py-2 bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 rounded-xl hover:bg-yellow-500/30 transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiSkipForward className="text-lg" />
                    <span>Skip</span>
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Chat Area */}
        <motion.div 
          className="flex-1 glass-card flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatStatus === 'idle' && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <FiMessageCircle className="text-6xl text-purple-300 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Welcome to Anonymous Talk
                </h3>
                <p className="text-white/70 mb-8 text-lg">
                  Click "Find Chat" to connect with a random stranger and start chatting!
                </p>
                <motion.div 
                  className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl p-6 max-w-md mx-auto backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="font-semibold text-purple-300 mb-4 flex items-center justify-center space-x-2">
                    <FiAlertTriangle className="text-lg" />
                    <span>Safety Tips:</span>
                  </h4>
                  <ul className="text-white/80 space-y-2">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span>Never share personal information</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span>Report inappropriate behavior</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span>Be respectful to others</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span>Have fun and stay safe!</span>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            )}

            {chatStatus === 'searching' && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <LoadingSpinner size="lg" color="white" />
                <h3 className="text-xl font-semibold text-white mb-2 mt-4">
                  Finding someone for you...
                </h3>
                <p className="text-white/70">
                  This usually takes just a few seconds
                </p>
              </motion.div>
            )}

            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                {message.isSystem ? (
                  <motion.div 
                    className="bg-white/10 text-white/80 px-4 py-2 rounded-xl text-sm text-center max-w-md backdrop-blur-sm border border-white/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    {message.message}
                  </motion.div>
                ) : (
                  <motion.div 
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl backdrop-blur-sm ${
                      message.isOwn
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-white/20 text-white border border-white/30'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="break-words">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwn ? 'text-purple-100' : 'text-white/60'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white/20 text-white/80 px-4 py-3 rounded-2xl backdrop-blur-sm border border-white/30">
                  <div className="flex space-x-1">
                    <motion.div 
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          {chatStatus === 'connected' && (
            <motion.div 
              className="border-t border-white/20 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={messageInput}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    maxLength={500}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: messageInput.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: messageInput.trim() ? 0.95 : 1 }}
                >
                  <FiSend className="text-lg" />
                </motion.button>
              </form>
            </motion.div>
          )}
        </motion.div>

        {/* Interests Modal */}
        <AnimatePresence>
          {showInterestsModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowInterestsModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="glass-card p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-white mb-2">Select Your Interests</h3>
                <p className="text-white/70 mb-6">
                  Choose topics you're interested in to find like-minded people
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-8 max-h-60 overflow-y-auto">
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

                <div className="flex space-x-4">
                  <motion.button
                    onClick={() => setShowInterestsModal(false)}
                    className="flex-1 btn-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleFindChat}
                    className="flex-1 btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Find Chat
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Report Modal */}
        <AnimatePresence>
          {showReportModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowReportModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="glass-card p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <FiAlertTriangle className="text-red-400 text-2xl" />
                  <h3 className="text-2xl font-bold text-white">Report User</h3>
                </div>
                
                <p className="text-white/70 mb-6">
                  Please select the reason for reporting this user:
                </p>
                
                <div className="space-y-3 mb-8">
                  {reportReasons.map((reason) => (
                    <motion.button
                      key={reason.value}
                      onClick={() => handleReport(reason.value)}
                      className="w-full text-left px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {reason.label}
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-center">
                  <motion.button
                    onClick={() => setShowReportModal(false)}
                    className="btn-secondary px-8"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chat;