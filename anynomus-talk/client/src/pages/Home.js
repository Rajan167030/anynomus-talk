import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiMessageCircle, 
  FiShield, 
  FiUsers, 
  FiZap, 
  FiEye, 
  FiHeart,
  FiArrowRight,
  FiStar,
  FiPlay,
  FiGlobe,
  FiLock
} from 'react-icons/fi';

const Home = () => {
  const features = [
    {
      icon: FiMessageCircle,
      title: 'Anonymous Chatting',
      description: 'Chat with strangers without revealing your identity. Complete privacy guaranteed.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FiShield,
      title: 'Safe & Secure',
      description: 'Advanced moderation and reporting system to ensure a safe chatting environment.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FiUsers,
      title: 'Gender Filtering',
      description: 'Choose your preferred gender to chat with for more comfortable conversations.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FiZap,
      title: 'Instant Matching',
      description: 'Get connected with someone instantly. No waiting, just start chatting!',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: FiGlobe,
      title: 'Global Community',
      description: 'Connect with people from around the world and discover new cultures.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: FiLock,
      title: 'Privacy First',
      description: 'Your conversations are private and secure. No data stored or shared.',
      color: 'from-red-500 to-red-600'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '50K+', label: 'Chats Daily' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Moderation' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
                <FiStar className="mr-2" />
                Join 10K+ users worldwide
              </span>
            </motion.div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Chat Anonymously with
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                Random Strangers
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-white/90 leading-relaxed">
              Connect with people from around the world in a safe, anonymous environment. 
              No judgments, just genuine conversations that matter.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/register"
                className="btn btn-xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold shadow-2xl group"
              >
                <FiPlay className="mr-2 group-hover:translate-x-1 transition-transform" />
                Start Chatting Now
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="btn btn-xl btn-outline group"
              >
                <FiEye className="mr-2 group-hover:scale-110 transition-transform" />
                Learn More
              </Link>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-16 flex justify-center items-center space-x-8 text-white/70"
            >
              <div className="flex items-center space-x-2">
                <FiShield className="text-green-400" />
                <span className="text-sm">100% Anonymous</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiLock className="text-blue-400" />
                <span className="text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiZap className="text-yellow-400" />
                <span className="text-sm">Instant Matching</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50"></div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands Worldwide
            </h2>
            <p className="text-lg text-gray-600">Join our growing community of anonymous chatters</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Anonymous Talk?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              We've built the safest and most user-friendly anonymous chat platform 
              with cutting-edge features that prioritize your privacy and experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-glass p-8 group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just 3 simple steps and begin your anonymous chatting journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '1',
                title: 'Sign Up',
                description: 'Create your account with just an email and choose your preferences for the perfect match.',
                icon: FiUsers,
                color: 'from-blue-500 to-blue-600'
              },
              {
                step: '2',
                title: 'Get Matched',
                description: 'Our intelligent system instantly connects you with a compatible stranger based on your preferences.',
                icon: FiZap,
                color: 'from-purple-500 to-purple-600'
              },
              {
                step: '3',
                title: 'Start Chatting',
                description: 'Begin your anonymous conversation and enjoy meeting new people from around the world!',
                icon: FiMessageCircle,
                color: 'from-green-500 to-green-600'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <div className={`w-20 h-20 bg-gradient-to-r ${step.color} text-white rounded-3xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                    {step.step}
                  </div>
                  <div className={`absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-300`}>
                    <step.icon className="text-white text-lg" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Users Say
            </h2>
            <p className="text-xl text-gray-600">Real feedback from our amazing community</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Amazing platform! I've met so many interesting people from different cultures. The anonymity makes conversations more genuine and meaningful.",
                author: "Anonymous User",
                rating: 5,
                location: "Global Community"
              },
              {
                text: "Finally, a chat platform that prioritizes safety. The moderation is excellent and I feel completely secure while chatting with strangers.",
                author: "Anonymous User",
                rating: 5,
                location: "Safety First"
              },
              {
                text: "The gender filtering feature is fantastic. It helps me find people I'm more comfortable talking to. Highly recommended for everyone!",
                author: "Anonymous User",
                rating: 5,
                location: "Smart Matching"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-8 group hover:scale-105 transition-all duration-300"
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-current text-lg" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-primary-600 font-medium">
                    {testimonial.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Anonymous Journey?
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
              Join thousands of users who are already enjoying meaningful anonymous conversations. 
              It's free, safe, and incredibly fun!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/register"
                className="btn btn-xl bg-white text-primary-600 hover:bg-gray-100 font-semibold shadow-2xl group"
              >
                <FiPlay className="mr-2 group-hover:translate-x-1 transition-transform" />
                Get Started Today
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="btn btn-xl btn-outline group"
              >
                <FiEye className="mr-2 group-hover:scale-110 transition-transform" />
                Learn More
              </Link>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-16 flex justify-center items-center space-x-8 text-white/70"
            >
              <div className="flex items-center space-x-2">
                <FiShield className="text-green-400" />
                <span className="text-sm">100% Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiLock className="text-blue-400" />
                <span className="text-sm">No Credit Card</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiZap className="text-yellow-400" />
                <span className="text-sm">Instant Access</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;