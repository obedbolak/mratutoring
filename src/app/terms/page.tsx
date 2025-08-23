// src/app/terms/page.tsx
'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent } from '@/components/ui';
import {
  Scale,
  Users,
  CreditCard,
  Shield,
  AlertTriangle,
  FileText,
  UserCheck,
  Ban,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sections = [
    {
      icon: FileText,
      title: '1. Acceptance of Terms',
      content: `By accessing and using MisterA's platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.

These Terms of Service ("Terms") govern your use of our website and mobile application (collectively, the "Service") operated by MisterA's Education Platform ("us", "we", or "our").

Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.`,
    },
    {
      icon: Users,
      title: '2. User Accounts and Responsibilities',
      content: `Account Creation:
• You must provide accurate, current, and complete information during registration
• You are responsible for safeguarding your account password
• You must notify us immediately of any unauthorized use of your account
• You must be at least 13 years old to create an account

User Conduct:
• Use the Service only for lawful purposes and in accordance with these Terms
• Respect other users and maintain professional communication
• Do not share inappropriate content or engage in harassment
• Comply with all applicable local, state, national, and international laws`,
    },
    {
      icon: UserCheck,
      title: '3. Tutor Verification and Standards',
      content: `Tutor Requirements:
• All tutors must pass our verification process including background checks
• Tutors must provide proof of educational qualifications and teaching experience
• Tutors agree to maintain professional standards during all interactions
• Tutors must attend scheduled sessions or provide appropriate notice for cancellations

Platform Standards:
• We reserve the right to remove tutors who violate our community guidelines
• Tutors must maintain a minimum rating and response time standard
• Continuous education and platform training may be required`,
    },
    {
      icon: CreditCard,
      title: '4. Payment Terms and Billing',
      content: `Payment Processing:
• Payments are processed securely through our verified payment partners
• We accept Mobile Money (MTN, Orange), bank transfers, and cash for in-person sessions
• All fees are in CFA Francs (FCFA) unless otherwise specified

Refund Policy:
• Full refunds available within 24 hours of booking for unused sessions
• 50% refund for cancellations made less than 24 hours before session
• No refunds for sessions that have already taken place
• Refunds for unsatisfactory sessions evaluated on case-by-case basis

Service Fees:
• Platform fees are clearly disclosed before payment
• Tutor rates are set by individual tutors and displayed upfront
• Additional fees may apply for premium features or rush bookings`,
    },
    {
      icon: Shield,
      title: '5. Privacy and Data Protection',
      content: `Data Collection and Use:
• We collect only necessary information to provide our services
• Your personal information is protected according to our Privacy Policy
• We do not sell your personal information to third parties
• Session recordings may be stored for quality assurance purposes

Data Security:
• We implement industry-standard security measures
• All payments are processed through encrypted, secure channels
• User communications are protected and monitored only for safety purposes
• You have the right to request deletion of your personal data`,
    },
    {
      icon: AlertTriangle,
      title: '6. Prohibited Uses and Content',
      content: `Prohibited Activities:
• Harassment, bullying, or inappropriate behavior toward other users
• Sharing false or misleading information about qualifications or experience
• Attempting to circumvent platform fees or payment systems
• Using the platform for any illegal activities
• Sharing copyrighted material without proper authorization

Content Guidelines:
• All content must be appropriate for educational purposes
• No offensive, discriminatory, or harmful content
• Respect intellectual property rights
• Report any violations to our support team immediately`,
    },
    {
      icon: Ban,
      title: '7. Account Suspension and Termination',
      content: `Grounds for Suspension:
• Violation of these Terms of Service
• Inappropriate conduct or behavior
• Fraudulent activity or payment disputes
• Failure to maintain minimum service standards (for tutors)

Termination Process:
• We reserve the right to suspend or terminate accounts with appropriate notice
• Users may close their accounts at any time
• Upon termination, access to paid content and services will be revoked
• Outstanding financial obligations remain in effect after termination`,
    },
    {
      icon: Scale,
      title: '8. Limitation of Liability',
      content: `Service Disclaimer:
• The Service is provided "as is" without warranties of any kind
• We do not guarantee specific educational outcomes or results
• Tutor performance and quality may vary between individuals
• Technical issues may occasionally affect service availability

Liability Limitations:
• Our liability is limited to the amount paid for services in the past 12 months
• We are not liable for indirect, incidental, or consequential damages
• Users assume responsibility for their educational progress and outcomes
• Third-party integrations and services are subject to their own terms`,
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className={`text-4xl sm:text-5xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-6`}
            >
              Terms of
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
                Service
              </span>
            </h1>
            <p
              className={`text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-3xl mx-auto mb-6`}
            >
              Please read these Terms of Service carefully before using
              MisterA's platform. By using our service, you agree to these
              terms.
            </p>
            <div
              className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Last updated: January 15, 2025 • Effective Date: January 1, 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    className={
                      isDark
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                    }
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div
                          className={`p-3 rounded-lg ${
                            isDark ? 'bg-indigo-900' : 'bg-indigo-100'
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              isDark ? 'text-indigo-400' : 'text-indigo-600'
                            }`}
                          />
                        </div>
                        <h2
                          className={`text-2xl font-bold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {section.title}
                        </h2>
                      </div>

                      <div
                        className={`${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        } leading-relaxed`}
                      >
                        {section.content
                          .split('\n')
                          .map((paragraph, pIndex) => (
                            <p
                              key={pIndex}
                              className={paragraph.trim() ? 'mb-4' : ''}
                            >
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Contact and Updates */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card
              className={`${
                isDark
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <CardContent className="p-6 text-center">
                <Scale
                  className={`w-10 h-10 ${
                    isDark ? 'text-indigo-400' : 'text-indigo-600'
                  } mx-auto mb-4`}
                />
                <h3
                  className={`text-lg font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  } mb-3`}
                >
                  Legal Questions?
                </h3>
                <p
                  className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  } mb-4`}
                >
                  Contact our legal team for any questions about these terms.
                </p>
                <p
                  className={`text-sm ${
                    isDark ? 'text-indigo-400' : 'text-indigo-600'
                  }`}
                >
                  legal@mistera.ng
                </p>
              </CardContent>
            </Card>

            <Card
              className={`${
                isDark
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <CardContent className="p-6 text-center">
                <AlertTriangle
                  className={`w-10 h-10 ${
                    isDark ? 'text-orange-400' : 'text-orange-600'
                  } mx-auto mb-4`}
                />
                <h3
                  className={`text-lg font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  } mb-3`}
                >
                  Terms Updates
                </h3>
                <p
                  className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  } mb-4`}
                >
                  We may update these terms. You'll be notified of significant
                  changes.
                </p>
                <p
                  className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Check this page regularly for updates
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
