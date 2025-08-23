// src/app/privacy/page.tsx
'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent } from '@/components/ui';
import { Shield, Eye, Lock, Users, FileText, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, book a tutoring session, or contact us for support. This includes:

• Personal Information: Name, email address, phone number, location
• Educational Information: Subject preferences, academic level, learning goals
• Payment Information: Payment method details for processing transactions
• Communications: Messages between you and tutors, support requests
• Usage Data: How you interact with our platform, session attendance`,
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: `We use the information we collect to:

• Provide and improve our tutoring services
• Match you with suitable tutors based on your preferences
• Process payments and manage billing
• Communicate with you about your account and sessions
• Send educational content and platform updates
• Ensure platform security and prevent fraud
• Comply with legal obligations`,
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: `We do not sell your personal information. We may share your information in these limited circumstances:

• With Tutors: Basic profile information to facilitate tutoring sessions
• Service Providers: Third-party companies that help us operate our platform
• Legal Requirements: When required by law or to protect our rights
• Business Transfers: In case of merger, acquisition, or sale of our business
• With Consent: When you explicitly authorize us to share information`,
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to protect your information:

• Encryption in transit and at rest
• Regular security assessments and updates
• Limited access to personal information
• Secure payment processing through certified providers
• Employee training on data protection
• Incident response procedures`,
    },
    {
      icon: Clock,
      title: 'Data Retention',
      content: `We retain your information for as long as necessary to provide our services and comply with legal obligations:

• Account Information: Until you delete your account
• Session Records: For educational and billing purposes
• Communications: For quality assurance and support
• Payment Records: As required by financial regulations
• Marketing Communications: Until you unsubscribe`,
    },
    {
      icon: Shield,
      title: 'Your Rights',
      content: `Under applicable data protection laws, you have the right to:

• Access your personal information
• Correct inaccurate information
• Delete your information (subject to legal requirements)
• Restrict processing of your information
• Data portability
• Object to processing for marketing purposes
• Withdraw consent where applicable`,
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
              Privacy
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
                Policy
              </span>
            </h1>
            <p
              className={`text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-3xl mx-auto mb-6`}
            >
              Your privacy is important to us. This policy explains how
              MisterA's collects, uses, and protects your personal information.
            </p>
            <div
              className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Last updated: January 15, 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* Policy Content */}
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

          {/* Contact Information */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card
              className={`${
                isDark
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-indigo-50 border-indigo-200'
              }`}
            >
              <CardContent className="p-8 text-center">
                <Mail
                  className={`w-12 h-12 ${
                    isDark ? 'text-indigo-400' : 'text-indigo-600'
                  } mx-auto mb-4`}
                />
                <h3
                  className={`text-xl font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  } mb-4`}
                >
                  Questions About Our Privacy Policy?
                </h3>
                <p
                  className={`${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  } mb-6`}
                >
                  If you have any questions about this Privacy Policy or how we
                  handle your data, please don't hesitate to contact our Data
                  Protection Officer.
                </p>
                <div
                  className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  } space-y-1`}
                >
                  <p>Email: privacy@mistera.ng</p>
                  <p>Address: Carrefour Obili, Yaoundé, Cameroon</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
