import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiEye, FiLock, FiDatabase } from 'react-icons/fi';

const PrivacyPolicy = () => {
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
              <FiShield className="text-3xl text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-200 text-lg">
              Your privacy is our top priority. Learn how we protect your data.
            </p>
            <p className="text-gray-300 text-sm mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Anonymous Talk ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our anonymous chat service. Please read this privacy 
                policy carefully. If you do not agree with the terms of this privacy policy, 
                please do not access the application.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <FiDatabase className="text-blue-600 text-xl" />
                <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Personal Information
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We may collect personal information that you voluntarily provide when registering 
                    for an account, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Email address</li>
                    <li>Phone number (optional)</li>
                    <li>Gender preference</li>
                    <li>Interests and preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Usage Information
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We automatically collect certain information about your device and usage patterns:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>IP address and location data</li>
                    <li>Device information and browser type</li>
                    <li>Usage statistics and session duration</li>
                    <li>Technical logs for debugging and security</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Chat Information
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    <strong>Important:</strong> We do NOT store your chat messages or conversations. 
                    All messages are transmitted in real-time and are not saved on our servers. 
                    However, we may temporarily process messages for:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Content moderation and safety filtering</li>
                    <li>Spam and abuse detection</li>
                    <li>Technical delivery purposes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <FiEye className="text-blue-600 text-xl" />
                <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Service Provision</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Matching you with compatible chat partners</li>
                    <li>• Facilitating real-time communication</li>
                    <li>• Personalizing your experience</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Safety & Security</h4>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Preventing abuse and harassment</li>
                    <li>• Moderating content for safety</li>
                    <li>• Investigating reports and violations</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Communication</h4>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Sending important service updates</li>
                    <li>• Responding to your inquiries</li>
                    <li>• Providing customer support</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Improvement</h4>
                  <ul className="text-orange-800 text-sm space-y-1">
                    <li>• Analyzing usage patterns</li>
                    <li>• Improving our services</li>
                    <li>• Developing new features</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800 font-medium">
                  We do NOT sell, trade, or rent your personal information to third parties.
                </p>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                We may share your information only in the following limited circumstances:
              </p>
              
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-gray-800 min-w-0">Legal Requirements:</span>
                  <span>When required by law, court order, or government request</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-gray-800 min-w-0">Safety Protection:</span>
                  <span>To protect the rights, property, or safety of our users or the public</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-gray-800 min-w-0">Service Providers:</span>
                  <span>With trusted third-party services that help us operate our platform (under strict confidentiality agreements)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-gray-800 min-w-0">Business Transfer:</span>
                  <span>In the event of a merger, acquisition, or sale of assets (with prior notice)</span>
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <FiLock className="text-blue-600 text-xl" />
                <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect 
                your personal information:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Technical Measures</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• SSL/TLS encryption for data transmission</li>
                    <li>• Secure server infrastructure</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Access controls and authentication</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Operational Measures</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Limited access to personal data</li>
                    <li>• Employee training on data protection</li>
                    <li>• Incident response procedures</li>
                    <li>• Regular backup and recovery testing</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Access and Portability</h4>
                  <p className="text-gray-600 text-sm">
                    Request a copy of your personal data and receive it in a portable format
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Correction and Update</h4>
                  <p className="text-gray-600 text-sm">
                    Update or correct your personal information through your profile settings
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Deletion</h4>
                  <p className="text-gray-600 text-sm">
                    Request deletion of your account and associated personal data
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Objection and Restriction</h4>
                  <p className="text-gray-600 text-sm">
                    Object to or restrict certain processing of your personal information
                  </p>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-600 leading-relaxed">
                We retain your personal information only for as long as necessary to provide our 
                services and fulfill the purposes outlined in this policy. Specifically:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Account information: Until you delete your account</li>
                <li>Usage logs: Up to 90 days for security and debugging purposes</li>
                <li>Chat messages: Not stored (real-time only)</li>
                <li>Reports and violations: Up to 2 years for safety purposes</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  <strong>Age Restriction:</strong> Our service is not intended for children under 13 years of age. 
                  We do not knowingly collect personal information from children under 13. If you are a parent 
                  or guardian and believe your child has provided us with personal information, please contact us 
                  immediately.
                </p>
              </div>
            </section>

            {/* International Users */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Users</h2>
              <p className="text-gray-600 leading-relaxed">
                Anonymous Talk is operated from India. If you are accessing our service from outside India, 
                please be aware that your information may be transferred to, stored, and processed in India 
                where our servers are located and our central database is operated. By using our service, 
                you consent to the transfer of your information to India.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                You are advised to review this Privacy Policy periodically for any changes. Changes to 
                this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Us</h2>
              <p className="text-blue-800 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-blue-800">
                <p><strong>Email:</strong> privacy@anonymoustalk.com</p>
                <p><strong>Developer:</strong> Rajan Jha</p>
                <p><strong>GitHub:</strong> <a href="https://github.com/Rajan16703" className="underline hover:text-blue-600">@Rajan16703</a></p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;