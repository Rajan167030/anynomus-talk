import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiAlertTriangle, FiShield, FiUsers } from 'react-icons/fi';

const TermsOfService = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiFileText className="text-3xl text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-200 text-lg">
              Please read these terms carefully before using Anonymous Talk
            </p>
            <p className="text-gray-300 text-sm mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms of Service ("Terms") govern your use of Anonymous Talk ("Service") 
                operated by Rajan Jha ("us", "we", or "our"). By accessing or using our Service, 
                you agree to be bound by these Terms. If you disagree with any part of these terms, 
                then you may not access the Service.
              </p>
            </section>

            {/* Acceptance */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                By creating an account or using Anonymous Talk, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms and our Privacy Policy. These Terms 
                apply to all visitors, users, and others who access or use the Service.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  <strong>Important:</strong> You must be at least 13 years old to use this service. 
                  Users under 18 should have parental consent.
                </p>
              </div>
            </section>

            {/* Description of Service */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <FiUsers className="text-blue-600 text-xl" />
                <h2 className="text-2xl font-bold text-gray-900">Description of Service</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Anonymous Talk is an online platform that enables users to engage in anonymous 
                text-based conversations with random strangers. Our Service includes:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Random matching with other users for one-on-one conversations</li>
                <li>Real-time text messaging capabilities</li>
                <li>Gender and interest-based filtering options</li>
                <li>Reporting and moderation tools for user safety</li>
                <li>User account management and preferences</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Creation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To use certain features of our Service, you must create an account. You agree to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Notify us immediately of any unauthorized use</li>
                    <li>Accept responsibility for all activities under your account</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Termination</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You may delete your account at any time. We reserve the right to suspend or 
                    terminate accounts that violate these Terms or engage in harmful behavior.
                  </p>
                </div>
              </div>
            </section>

            {/* Acceptable Use */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <FiShield className="text-green-600 text-xl" />
                <h2 className="text-2xl font-bold text-gray-900">Acceptable Use Policy</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">You May:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Use the Service for lawful purposes only</li>
                    <li>Engage in respectful conversations with other users</li>
                    <li>Report inappropriate behavior or content</li>
                    <li>Customize your preferences and interests</li>
                    <li>End conversations at any time</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">You May NOT:</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <ul className="list-disc list-inside text-red-800 space-y-1">
                      <li>Share personal information (yours or others')</li>
                      <li>Engage in harassment, bullying, or threatening behavior</li>
                      <li>Send spam, advertisements, or promotional content</li>
                      <li>Share inappropriate, offensive, or illegal content</li>
                      <li>Attempt to circumvent our safety measures</li>
                      <li>Use automated tools or bots</li>
                      <li>Impersonate others or provide false information</li>
                      <li>Attempt to hack or disrupt the Service</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Content and Conduct */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <FiAlertTriangle className="text-yellow-600 text-xl" />
                <h2 className="text-2xl font-bold text-gray-900">Content and Conduct</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">User-Generated Content</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You are solely responsible for the content you share through our Service. 
                    By using our Service, you represent that your content:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Does not violate any laws or regulations</li>
                    <li>Does not infringe on others' rights</li>
                    <li>Is not harmful, offensive, or inappropriate</li>
                    <li>Does not contain personal information</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Moderation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We employ automated and human moderation to maintain a safe environment. 
                    We reserve the right to remove content or restrict users who violate our policies.
                  </p>
                </div>
              </div>
            </section>

            {/* Privacy and Data */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800 font-medium mb-2">Anonymity Commitment:</p>
                <p className="text-blue-800">
                  We do not store your chat messages or conversations. All communications are 
                  real-time only and are not saved on our servers.
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand 
                how we collect, use, and protect your information. By using our Service, you 
                consent to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Rights</h3>
                  <p className="text-gray-600 leading-relaxed">
                    The Service and its original content, features, and functionality are and will 
                    remain the exclusive property of Rajan Jha and its licensors. The Service is 
                    protected by copyright, trademark, and other laws.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Rights</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You retain ownership of any content you create. However, by using our Service, 
                    you grant us a limited license to process and moderate your content for safety purposes.
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimers */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers and Limitations</h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Service Availability</h3>
                  <p className="text-yellow-800">
                    We strive to maintain high availability but cannot guarantee uninterrupted service. 
                    The Service is provided "as is" without warranties of any kind.
                  </p>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">User Interactions</h3>
                  <p className="text-red-800">
                    We are not responsible for the actions, content, or behavior of other users. 
                    Use caution when interacting with strangers and report any inappropriate behavior.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Limitation of Liability</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To the maximum extent permitted by law, we shall not be liable for any indirect, 
                    incidental, special, consequential, or punitive damages resulting from your use 
                    of the Service.
                  </p>
                </div>
              </div>
            </section>

            {/* Enforcement */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Enforcement and Violations</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Reporting Violations</h3>
                  <p className="text-gray-600 leading-relaxed">
                    If you encounter behavior that violates these Terms, please report it immediately 
                    using our in-app reporting tools. We take all reports seriously and investigate promptly.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Consequences</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Violations may result in warnings, temporary suspensions, or permanent bans, 
                    depending on the severity and frequency of the violation.
                  </p>
                </div>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision 
                is material, we will try to provide at least 30 days notice prior to any new terms 
                taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of India, without regard 
                to its conflict of law provisions. Any disputes arising from these Terms or the 
                Service shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Information</h2>
              <p className="text-blue-800 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-blue-800">
                <p><strong>Email:</strong> legal@anonymoustalk.com</p>
                <p><strong>Developer:</strong> Rajan Jha</p>
                <p><strong>GitHub:</strong> <a href="https://github.com/Rajan16703" className="underline hover:text-blue-600">@Rajan16703</a></p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-blue-700 text-sm">
                  <strong>Effective Date:</strong> These Terms of Service are effective as of the date 
                  you first use the Service and remain in effect until terminated.
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;