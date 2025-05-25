import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiShield, 
  FiUsers, 
  FiHeart, 
  FiZap,
  FiGithub,
  FiMail,
  FiArrowRight
} from 'react-icons/fi';

const About = () => {
  const features = [
    {
      icon: FiShield,
      title: 'Privacy First',
      description: 'Your identity remains completely anonymous. We never store personal conversations or share your data with third parties.'
    },
    {
      icon: FiUsers,
      title: 'Global Community',
      description: 'Connect with people from all around the world. Break down barriers and discover different cultures and perspectives.'
    },
    {
      icon: FiHeart,
      title: 'Safe Environment',
      description: 'Our advanced moderation system and reporting features ensure a safe and respectful chatting environment for everyone.'
    },
    {
      icon: FiZap,
      title: 'Instant Connections',
      description: 'No waiting around. Our smart matching algorithm connects you with compatible strangers in seconds.'
    }
  ];

  const team = [
    {
      name: 'Rajan Jha',
      role: 'Full Stack Developer & Creator',
      description: 'Passionate about creating safe spaces for meaningful connections online.',
      github: 'https://github.com/Rajan16703'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              About Anonymous Talk
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/80">
              Building bridges between strangers through safe, anonymous conversations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                In an increasingly connected yet isolated world, Anonymous Talk provides a platform 
                where people can have genuine conversations without the pressure of social expectations 
                or judgment. We believe that anonymity can foster more honest, open, and meaningful 
                interactions between strangers from different walks of life.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-card p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Why Anonymous Chatting?
                </h3>
                <div className="space-y-4 text-white/80">
                  <p>
                    <strong className="text-purple-300">Freedom of Expression:</strong> Without the fear of judgment based on 
                    appearance, social status, or background, people can express themselves more freely.
                  </p>
                  <p>
                    <strong className="text-purple-300">Cultural Exchange:</strong> Connect with people from different countries, 
                    cultures, and backgrounds to broaden your perspective.
                  </p>
                  <p>
                    <strong className="text-purple-300">Mental Health Support:</strong> Sometimes talking to a stranger can be 
                    more therapeutic than talking to someone you know.
                  </p>
                  <p>
                    <strong className="text-purple-300">Practice Communication:</strong> Improve your conversation skills in a 
                    low-pressure environment.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-card p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Our Values
                </h3>
                <ul className="space-y-4 text-white/80">
                  <li className="flex items-start space-x-3">
                    <FiShield className="text-purple-400 mt-1 flex-shrink-0 text-xl" />
                    <span><strong className="text-white">Privacy:</strong> Your anonymity is our top priority</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FiHeart className="text-pink-400 mt-1 flex-shrink-0 text-xl" />
                    <span><strong className="text-white">Respect:</strong> We promote kindness and understanding</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FiUsers className="text-blue-400 mt-1 flex-shrink-0 text-xl" />
                    <span><strong className="text-white">Inclusion:</strong> Everyone is welcome regardless of background</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FiZap className="text-yellow-400 mt-1 flex-shrink-0 text-xl" />
                    <span><strong className="text-white">Innovation:</strong> Continuously improving user experience</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Makes Us Different
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              We've built more than just a chat platform - we've created a safe space for human connection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex-shrink-0">
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Your Safety is Our Priority
              </h2>
              <p className="text-lg text-white/80">
                We've implemented multiple layers of protection to ensure a safe chatting experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiShield className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Content Moderation
                </h3>
                <p className="text-white/80">
                  Advanced AI and human moderation to filter inappropriate content and behavior
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card p-6 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUsers className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Report System
                </h3>
                <p className="text-white/80">
                  Easy-to-use reporting tools to flag inappropriate behavior and protect the community
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card p-6 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiZap className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Quick Actions
                </h3>
                <p className="text-white/80">
                  Skip or end conversations instantly if you feel uncomfortable or want to find someone new
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet the Creator
            </h2>
            <p className="text-xl text-white/80">
              The person behind Anonymous Talk
            </p>
          </motion.div>

          <div className="max-w-md mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 text-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUsers className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-purple-300 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-white/80 mb-6">
                  {member.description}
                </p>
                <div className="flex justify-center space-x-4">
                  <motion.a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white/80 hover:text-purple-300 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub className="text-xl" />
                    <span>GitHub</span>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30"></div>
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Ready to Start Connecting?
            </h2>
            <p className="text-xl mb-8 text-white/80">
              Join our community of people who believe in the power of anonymous, 
              meaningful conversations.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="btn-primary px-8 py-4 text-lg font-semibold inline-flex items-center space-x-2"
              >
                <span>Get Started Today</span>
                <FiArrowRight className="text-xl" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;